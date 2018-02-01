/**
 * Batter Box Component
 * @flow
 */

import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import Ball from '../models/Ball';

const STRIKE_ZONE = {
  WIDTH: 100,
  HEIGHT: 100,
};

const BALL = {
  RADIUS: 8,
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#404040',
  },
  leftBatter: {
    position: 'absolute',
    top: 0,
    left: 10,
    width: 100,
    height: 200,
    transform: [
      { scaleX: -1 },
      { scaleY: 1 },
    ],
  },
  rightBatter: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: 100,
    height: 200,
  },
  strikeZone: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#808080',
    borderStyle: 'solid',
  },
  strikeZoneRow: {
    flex: 3,
    flexDirection: 'row',
  },
  strikeZoneCell: {
    flex: 3,
    borderWidth: 1,
    borderColor: '#808080',
    borderStyle: 'dotted',
  },
  ball: {
    position: 'absolute',
    borderStyle: 'solid',
    borderWidth: 2,
  },
  ballText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#ffffff',
  },
});

const ballStyles = StyleSheet.create({
  swingStrike: {
    left: -BALL.RADIUS,
    top: -BALL.RADIUS,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    borderRadius: 0,
    ...Ball.styles('swingStrike'),
  },
  strike: {
    left: -BALL.RADIUS,
    top: -BALL.RADIUS,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    borderRadius: BALL.RADIUS,
    ...Ball.styles('strike'),
  },
  foul: {
    left: -BALL.RADIUS,
    top: -BALL.RADIUS,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    borderRadius: 0,
    ...Ball.styles('foul'),
  },
  hit: {
    left: -BALL.RADIUS,
    top: -BALL.RADIUS,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    borderRadius: 0,
    ...Ball.styles('hit'),
  },
  ball: {
    left: -BALL.RADIUS,
    top: -BALL.RADIUS,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    borderRadius: BALL.RADIUS,
    ...Ball.styles('ball'),
  },
  new: {
    position: 'absolute',
    left: -BALL.RADIUS,
    top: -BALL.RADIUS,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    backgroundColor: '#0080f0',
    borderRadius: BALL.RADIUS,
  },
});

class BallComponent extends Component<{}> {
  static propTypes = {
    type: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    text: PropTypes.string,
  }
  static defaultProps = {
    type: 'none',
    x: 0,
    y: 0,
    text: '',
  }

  constructor(props) {
    super(props);
    this.state = {
      x: this.props.x,
      y: this.props.y,
    };
  }

  render() {
    let ballViewStyle;
    if (this.props.type === 'swingStrike') {
      ballViewStyle = ballStyles.swingStrike;
    } else if (this.props.type === 'strike') {
      ballViewStyle = ballStyles.strike;
    } else if (this.props.type === 'foul') {
      ballViewStyle = ballStyles.foul;
    } else if (this.props.type === 'hit') {
      ballViewStyle = ballStyles.hit;
    } else if (this.props.type === 'ball') {
      ballViewStyle = ballStyles.ball;
    } else if (this.props.type === 'new') {
      ballViewStyle = ballStyles.new;
    } else {
      ballViewStyle = ballStyles.ball;
    }

    return (
      <View>
        <View
          ref={(c) => { this.view = c; }}
          style={[
            {
              position: 'absolute',
              left: this.state.x,
              top: this.state.y,
            },
          ]}
        >
          <View
            ref={(c) => { this.view = c; }}
            style={[
              styles.ball,
              ballViewStyle,
            ]}
          >
            <Text style={styles.ballText}>
              {this.props.text}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default class BatterBoxComponent extends Component<{}> {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    battingSide: PropTypes.string,
    balls: PropTypes.arrayOf(Ball.propTypes),
    newBall: Ball.propTypes,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
  }
  static defaultProps = {
    width: 100,
    height: 50,
    battingSide: 'none',
    balls: [],
    newBall: null,
    onPress: null,
    onLongPress: null,
  }

  onPress(evt) {
    evt.persist();
    this.measureBody()
      .then(({ pageX, pageY }) => {
        const ret = {
          x: evt.nativeEvent.pageX - pageX,
          y: evt.nativeEvent.pageY - pageY,
        };
        if (this.props.onPress) {
          this.props.onPress(ret);
        }
      });
  }

  onLongPress(evt) {
    evt.persist();
    this.measureBody()
      .then((measure) => {
        const location = {
          x: evt.nativeEvent.pageX - measure.pageX,
          y: evt.nativeEvent.pageY - measure.pageY,
        };
        const point = {
          pointX: Math.round((location.x - measure.width / 2) / (STRIKE_ZONE.WIDTH / 2) * 100),
          pointY: Math.round((measure.height / 2 - location.y) / (STRIKE_ZONE.HEIGHT / 2) * 100),
        };
        const ret = {
          ...location,
          ...point,
        };
        if (this.props.onLongPress) {
          this.props.onLongPress(ret);
        }
      });
  }

  measureBody() {
    return new Promise((resolve) => {
      this.body.measure((x, y, width, height, pageX, pageY) => {
        resolve({
          x, y, width, height, pageX, pageY,
        });
      });
    });
  }

  pointToLocation({ pointX, pointY }) {
    const x = this.props.width / 2
      + pointX / 100 * (STRIKE_ZONE.WIDTH / 2);
    const y = this.props.height / 2
      - pointY / 100 * (STRIKE_ZONE.HEIGHT / 2);
    return { x, y };
  }

  render() {
    const batterImage = this.props.battingSide === 'left' ? (
      <Image
        source={require('../../img/batter.png')}
        style={styles.leftBatter}
      />
    ) : (
      <Image
        source={require('../../img/batter.png')}
        style={styles.rightBatter}
      />
    );
    const strikeZoneRect = {
      left: this.props.width / 2 - STRIKE_ZONE.WIDTH / 2,
      top: this.props.height / 2 - STRIKE_ZONE.HEIGHT / 2,
      width: STRIKE_ZONE.WIDTH,
      height: STRIKE_ZONE.HEIGHT,
    };
    const ballComponents = this.props.balls.map((ball, i) => {
      const key = `ball${i}`;
      const location = this.pointToLocation(ball);

      return (
        <BallComponent
          key={key}
          index={i}
          type={ball.type}
          x={location.x}
          y={location.y}
          text={`${i + 1}`}
        />
      );
    });

    let newBallComponent = null;
    if (this.props.newBall) {
      const location = this.pointToLocation(this.props.newBall);
      newBallComponent = (
        <BallComponent
          key="newBall"
          type="new"
          x={location.x}
          y={location.y}
        />
      );
    }

    return (
      <TouchableWithoutFeedback
        onPress={evt => this.onPress(evt)}
        onLongPress={evt => this.onLongPress(evt)}
      >
        <View
          ref={(body) => { this.body = body; }}
          style={[
            styles.body,
            {
              width: this.props.width,
              height: this.props.height,
            },
          ]}
        >
          {batterImage}
          <View
            style={[
              styles.strikeZone,
              {
                left: strikeZoneRect.left,
                top: strikeZoneRect.top,
                width: strikeZoneRect.width,
                height: strikeZoneRect.height,
              },
            ]}
          >
            <View style={styles.strikeZoneRow}>
              <View style={styles.strikeZoneCell} />
              <View style={styles.strikeZoneCell} />
              <View style={styles.strikeZoneCell} />
            </View>
            <View style={styles.strikeZoneRow}>
              <View style={styles.strikeZoneCell} />
              <View style={styles.strikeZoneCell} />
              <View style={styles.strikeZoneCell} />
            </View>
            <View style={styles.strikeZoneRow}>
              <View style={styles.strikeZoneCell} />
              <View style={styles.strikeZoneCell} />
              <View style={styles.strikeZoneCell} />
            </View>
          </View>
          {ballComponents}
          {newBallComponent}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
