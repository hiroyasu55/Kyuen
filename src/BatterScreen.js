/**
 * Kyuen App
 * @flow
 */

import React, {
  Component,
} from 'react';
import {
  // Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import generate from 'nanoid/generate';
import Team from './models/Team';
import Player from './models/Player';
import Ball from './models/Ball';
import ScoreBoardComponent from './components/ScoreBoardComponent';
import BatterBoxComponent from './components/BatterBoxComponent';
import BatterInfoComponent from './components/BatterInfoComponent';
import CountsBoardComponent from './components/CountsBoardComponent';
import BallsListComponent from './components/BallsListComponent';
import CurrentPlayersListComponent from './components/CurrentPlayersListComponent';
import AddBallPopover from './components/AddBallPopover';

const win = Dimensions.get('window');

const batterBoxStyle = {
  width: win.width,
  height: win.width * 0.6,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002000',
  },
  scoreBoardArea: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#404040',
    width: '100%',
    height: 80,
  },
  batterBoxArea: {
    alignItems: 'center',
    backgroundColor: '#000000',
    width: batterBoxStyle.width,
    height: batterBoxStyle.height,
  },
  infoArea: {
    backgroundColor: '#000000',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  infoAreaCol: {
    flex: 3,
    marginRight: 4,
  },
  countsBoard: {
    marginBottom: 4,
  },
  batterInfo: {
    marginBottom: 4,
  },
  ballsList: {
    flex: 1,
  },
  currentPlayersList: {
    flex: 1,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#808080',
    padding: 8,
    borderRadius: 4,
  },
  tooltipText: {
    color: '#000000',
    fontSize: 12,
  },
});

class BallTooltipComponent extends Component<{}> {
  static propTypes = {
    isVisible: PropTypes.bool,
    text: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }
  static defaultProps = {
    isVisible: false,
    text: '',
    x: 0,
    y: 0,
  }

  render() {
    return this.props.isVisible ? (
      <View
        style={[
          styles.tooltip,
          {
            left: this.props.x,
            top: this.props.y,
          },
        ]}
      >
        <Text style={styles.tooltipText}>
          {this.props.text}
        </Text>
      </View>
    ) : (
      null
    );
  }
}

const getCounts = (balls) => {
  const ret = {
    ballsCount: 0,
    strikesCount: 0,
  };
  balls.forEach((ball) => {
    if (ball.judge === 'ball') {
      if (ret.ballsCount < 4) ret.ballsCount += 1;
    } else if (ball.judge === 'strike') {
      if (ret.strikesCount < 3) ret.strikesCount += 1;
    } else if (ball.judge === 'foul') {
      if (ret.strikesCount < 2) ret.strikesCount += 1;
    }
  });
  return ret;
};

const createId = () => {
  const id = generate('0123456789abcdef', 24);
  return id;
};

export default class BatterScreen extends Component<{}> {
  static navigationOptions = {
    title: '球援',
    headerStyle: {
      backgroundColor: '#00c000',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      tooltip: {
        isVisible: false,
        x: 0,
        y: 0,
        text: '',
      },
      addBallPopup: {
        isVisible: false,
        x: 0,
        y: 0,
        pointX: 0,
        pointY: 0,
      },
      newBall: null,
    };
    // const counts = getCounts(this.state.balls, this.state.outs);
  }

  componentDidMount() {
    this.fetchDate();
  }

  onBatterBoxPress() {
    this.setState((previousState) => {
      return {
        newBall: null,
        tooltip: Object.assign(previousState.tooltip, {
          isVisible: false,
        }),
        addBallPopup: Object.assign(previousState.addBallPopup, {
          isVisible: false,
        }),
      };
    });
  }

  onBatterBoxLongPress(ret) {
    this.setState(() => {
      return {
        newBall: null,
      };
    });
    this.batterBoxArea.measure((x, y) => {
      this.setState((previousState) => {
        return {
          newBall: new Ball({
            type: 'new',
            pointX: ret.pointX,
            pointY: ret.pointY,
          }),
          tooltip: Object.assign(previousState.tooltip, {
            isVisible: false,
          }),
          addBallPopup: Object.assign(previousState.addBallPopup, {
            isVisible: true,
            x: ret.x + x,
            y: ret.y + y,
            pointX: ret.pointX,
            pointY: ret.pointY,
            balls: this.state.balls,
          }),
        };
      });
    });
  }

  onBallPress(ret) {
    // console.log(ret);
    const ball = this.state.balls[ret.index];

    this.setState({
      newBall: null,
      tooltip: {
        isVisible: true,
        x: ret.x + 10,
        y: ret.y + 10,
        text: `index=${ret.index} judge=${ball.judge}`,
      },
      addBallPopup: {
        isVisible: false,
      },
    });
  }

  onAddBallPopoverSelect(ret) {
    // console.log(ret);
    let type = null;
    let judge = null;
    switch (ret.action) {
      case 'swingStrike':
        type = 'swingStrike';
        judge = 'strike';
        break;
      case 'strike':
        type = 'strike';
        judge = 'strike';
        break;
      case 'foul':
        type = 'foul';
        judge = 'foul';
        break;
      case 'ball':
        type = 'ball';
        judge = 'ball';
        break;
      case 'hit':
        type = 'hit';
        judge = 'hit';
        break;
      default:
    }

    if (type) {
      const ball = new Ball({
        type,
        judge,
        pointX: this.state.newBall.pointX,
        pointY: this.state.newBall.pointY,
      });
      this.addBall(ball);
    }

    this.setState({
      newBall: null,
      addBallPopup: {
        isVisible: false,
      },
    });
  }

  fetchDate() {
    const teams = [
      new Team({
        id: createId(),
        name: 'ドラゴンズ',
        players: [
          new Player({
            id: createId(),
            name: '京田',
            backNumber: '51',
            battingSide: 'left',
            pitchingSide: 'right',
            position: 'ss',
          }),
          new Player({
            id: createId(),
            name: '亀澤',
            backNumber: '53',
            battingSide: 'left',
            pitchingSide: 'right',
            position: '2b',
          }),
          new Player({
            id: createId(),
            name: '大島',
            backNumber: '8',
            battingSide: 'left',
            pitchingSide: 'left',
            position: 'cf',
          }),
          new Player({
            id: createId(),
            name: 'ビシエド',
            backNumber: '42',
            battingSide: 'right',
            pitchingSide: 'right',
            position: '1b',
          }),
          new Player({
            id: createId(),
            name: '福田',
            backNumber: '55',
            battingSide: 'right',
            pitchingSide: 'right',
            position: 'lf',
          }),
          new Player({
            id: createId(),
            name: '藤井',
            backNumber: '4',
            battingSide: 'both',
            pitchingSide: 'right',
            position: 'rf',
          }),
          new Player({
            id: createId(),
            name: '高橋',
            backNumber: '3',
            battingSide: 'left',
            pitchingSide: 'right',
            position: '3b',
          }),
          new Player({
            id: createId(),
            name: '大野奨',
            backNumber: '27',
            battingSide: 'right',
            pitchingSide: 'right',
            position: 'c',
          }),
          new Player({
            id: createId(),
            name: '大野雄',
            backNumber: '22',
            battingSide: 'left',
            pitchingSide: 'left',
            position: 'p',
          }),
        ],
      }),
      new Team({
        id: createId(),
        name: 'ベイスターズ',
        players: [
          new Player({
            id: createId(),
            name: '桑原',
            backNumber: '51',
            battingSide: 'left',
            pitchingSide: 'right',
            position: 'ss',
          }),
          new Player({
            id: createId(),
            name: '大和',
            backNumber: '9',
            battingSide: 'both',
            pitchingSide: 'right',
            position: '2b',
          }),
          new Player({
            id: createId(),
            name: 'ロペス',
            backNumber: '2',
            battingSide: 'right',
            pitchingSide: 'right',
            position: '1b',
          }),
          new Player({
            id: createId(),
            name: '筒香',
            backNumber: '7',
            battingSide: 'left',
            pitchingSide: 'right',
            position: 'lf',
          }),
          new Player({
            id: createId(),
            name: '宮﨑',
            backNumber: '51',
            battingSide: 'right',
            pitchingSide: 'right',
            position: '3b',
          }),
          new Player({
            id: createId(),
            name: '梶谷',
            backNumber: '3',
            battingSide: 'left',
            pitchingSide: 'right',
            position: 'rf',
          }),
          new Player({
            id: createId(),
            name: '戸柱',
            backNumber: '10',
            battingSide: 'left',
            pitchingSide: 'right',
            position: 'c',
          }),
          new Player({
            id: createId(),
            name: '井納',
            backNumber: '15',
            battingSide: 'right',
            pitchingSide: 'right',
            position: 'p',
          }),
          new Player({
            id: createId(),
            name: '倉本',
            backNumber: '5',
            battingSide: 'left',
            pitchingSide: 'right',
            position: 'ss',
          }),
        ],
      }),
    ];
    const scores = [
      [0],
    ];
    const currentPlayers = [
      [
        teams[0].players[0],
        teams[0].players[1],
        teams[0].players[2],
        teams[0].players[3],
        teams[0].players[4],
        teams[0].players[5],
        teams[0].players[6],
        teams[0].players[7],
        teams[0].players[8],
      ],
      [
        teams[1].players[0],
        teams[1].players[1],
        teams[1].players[2],
        teams[1].players[3],
        teams[1].players[4],
        teams[1].players[5],
        teams[1].players[6],
        teams[1].players[7],
        teams[1].players[8],
      ],
    ];
    const battersIndex = 0;
    const inning = 0;
    const turn = 0;
    const batters = currentPlayers[turn];
    const batter = batters[battersIndex];
    const battingSide = batter.battingSide === 'both'
      ? 'left'
      : batter.battingSide;
    setTimeout(() => {
      this.setState({
        isLoaded: true,
        teams: teams,
        scores: scores,
        inning: inning,
        turn: turn,
        currentPlayers: currentPlayers,
        battersIndex: battersIndex,
        battingSide: battingSide,
        balls: [],
        ballsCount: 0,
        strikesCount: 0,
        outsCount: 0,
      });
    }, 1000);
  }

  rotateBatter() {
    this.setState({
      battersIndex: (this.state.battersIndex + 1) % this.state.batters.length,
    });
  }

  addBall(ball) {
    this.state.balls.push(ball);
    const counts = {
      ...getCounts(this.state.balls),
      outsCount: this.state.outsCount,
    };
    let rotated = false;

    if (counts.ballsCount >= 4) {
      rotated = true;
    } else if (counts.strikesCount >= 3) {
      counts.outsCount += 1;
      rotated = true;
    }

    if (counts.outsCount > this.state.outsCount) {
      if (this.state.outsCount >= 3) {
        counts.outsCount = 0;
      }
    }
    if (rotated) {
      this.setState({
        // scores:
        balls: [],
        battersIndex:
          (this.state.battersIndex + 1) % this.state.currentPlayers[this.state.turn].length,
        ballsCount: 0,
        strikesCount: 0,
        outsCount: counts.outsCount,
      });
    } else {
      this.setState({
        ...counts,
      });
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.scoreBoardArea}>
          <ScoreBoardComponent
            teams={this.state.teams}
            scores={this.state.scores}
            inning={this.state.inning}
            turn={this.state.turn}
          />
        </View>
        <View
          ref={(c) => { this.batterBoxArea = c; }}
          style={styles.batterBoxArea}
        >
          <BatterBoxComponent
            width={batterBoxStyle.width}
            height={batterBoxStyle.height}
            batter={this.state.currentPlayers[this.state.turn][this.state.battersIndex]}
            battingSide={this.state.battingSide}
            balls={this.state.balls}
            newBall={this.state.newBall}
            onPress={ret => this.onBatterBoxPress(ret)}
            onLongPress={ret => this.onBatterBoxLongPress(ret)}
          />
        </View>
        <View style={styles.infoArea}>
          <View style={styles.infoAreaCol}>
            <View style={styles.countsBoard}>
              <CountsBoardComponent
                balls={this.state.ballsCount}
                strikes={this.state.strikesCount}
                outs={this.state.outsCount}
              />
            </View>
            <View style={styles.batterInfo}>
              <BatterInfoComponent
                batter={this.state.currentPlayers[this.state.turn][this.state.battersIndex]}
                battersIndex={this.state.battersIndex}
              />
            </View>
          </View>
          <View style={styles.infoAreaCol}>
            <View style={styles.ballsList}>
              <BallsListComponent
                balls={this.state.balls}
              />
            </View>
          </View>
          <View style={styles.infoAreaCol}>
            <View style={styles.currentPlayersList}>
              <CurrentPlayersListComponent
                team={this.state.teams[this.state.turn]}
                currentPlayers={this.state.currentPlayers[this.state.turn]}
                battersIndex={this.state.battersIndex}
              />
            </View>
          </View>
        </View>
        <BallTooltipComponent
          isVisible={this.state.tooltip.isVisible}
          x={this.state.tooltip.x}
          y={this.state.tooltip.y}
          text={`${this.state.tooltip.text}`}
        />
        <AddBallPopover
          isVisible={this.state.addBallPopup.isVisible}
          x={this.state.addBallPopup.x}
          y={this.state.addBallPopup.y}
          pointX={this.state.addBallPopup.pointX}
          pointY={this.state.addBallPopup.pointY}
          balls={this.state.balls}
          onSelect={ret => this.onAddBallPopoverSelect(ret)}
        />
      </View>
    );
  }
}
