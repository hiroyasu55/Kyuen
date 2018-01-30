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
import Player from './models/Player';
import Ball from './models/Ball';
import ScoreBoardComponent from './components/ScoreBoardComponent';
import BatterBoxComponent from './components/BatterBoxComponent';
import BatterInfoComponent from './components/BatterInfoComponent';
import CountsBoardComponent from './components/CountsBoardComponent';
import AddBallPopover from './components/AddBallPopover';

const win = Dimensions.get('window');

const batterBoxStyle = {
  width: win.width,
  height: win.width * 0.6,
};
const countsBoardWidth = 150;

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
  InfoArea: {
    alignItems: 'center',
    backgroundColor: '#000000',
    width: win.width,
    height: 100,
  },
  batterInfo: {
    position: 'absolute',
    left: 10,
    top: 10,
  },
  countsBoard: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  underArea: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2f4f4f',
  },
  ballsList: {
    backgroundColor: '#ffffff',
    width: win.width - countsBoardWidth,
    height: 500,
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

  /*
  constructor(props) {
    super(props);
    // this.state.isVisible = props.isVisible;
  }
  */

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

const getBatters = () => {
  const batters = [];
  batters.push(new Player({
    name: '京田',
    backNumber: '51',
    battingSide: 'left',
    position: 'ss',
  }));
  batters.push(new Player({
    name: '荒木',
    backNumber: '2',
    battingSide: 'right',
    position: '2b',
  }));
  batters.push(new Player({
    name: '大島',
    backNumber: '8',
    battingSide: 'left',
    position: 'cf',
  }));
  return batters;
};

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

export default class BatterScreen extends Component<{}> {
  static navigationOptions = {
    title: '球援',
    headerStyle: {
      backgroundColor: '#00c000',
    },
  };

  constructor(props) {
    super(props);
    const teams = [
      {
        name: 'ドラゴンズ',
      },
      {
        name: 'タイガース',
      },
    ];

    this.state = {
      isLoaded: false,
      teams: teams,
      batters: getBatters(),
      battersIndex: 0,
      balls: [],
      ballsCount: 0,
      strikesCount: 0,
      outsCount: 0,
      newBall: null,
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
          x: ret.x,
          y: ret.y,
          pointX: ret.pointX,
          pointY: ret.pointY,
          balls: this.state.balls,
        }),
      };
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
    this.setState({
      // isLoaded: true,
    });
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
        balls: [],
        battersIndex: (this.state.battersIndex + 1) % this.state.batters.length,
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
    if (this.state.isLoading) {
      return (
        <View
          style={{
            flex: 1,
            paddingTop: 20,
          }}
        >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.scoreBoardArea}>
          <ScoreBoardComponent
            teams={this.state.teams}
          />
        </View>
        <View style={styles.batterBoxArea}>
          <BatterBoxComponent
            width={batterBoxStyle.width}
            height={batterBoxStyle.height}
            batters={this.state.batters}
            battersIndex={this.state.battersIndex}
            balls={this.state.balls}
            newBall={this.state.newBall}
            onPress={ret => this.onBatterBoxPress(ret)}
            onLongPress={ret => this.onBatterBoxLongPress(ret)}
          />
        </View>
        <View style={styles.InfoArea}>
          <View style={styles.batterInfo}>
            <BatterInfoComponent
              batters={this.state.batters}
              battersIndex={this.state.battersIndex}
            />
          </View>
          <View style={styles.countsBoard}>
            <CountsBoardComponent
              balls={this.state.ballsCount}
              strikes={this.state.strikesCount}
              outs={this.state.outsCount}
            />
          </View>
        </View>
        <View style={styles.underArea}>
          <View style={styles.ballsList}>
            <Text>1</Text>
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
