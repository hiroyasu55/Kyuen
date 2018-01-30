/**
 * Balls List Component
 * @flow
 */

import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    width: 150,
    height: 120,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'gray',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  rowHeader: {
    marginTop: 2,
    flex: 5,
    width: 20,
  },
  rowHeaderText: {
    color: '#ffffff',
    fontSize: 20,
  },
  ballCell: {
    flex: 5,
    // width: 30,
  },
  ball: {
    marginTop: 4,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    backgroundColor: '#008000',
    borderRadius: BALL.RADIUS,
  },
  strike: {
    marginTop: 4,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    backgroundColor: '#ffa500',
    borderRadius: BALL.RADIUS,
  },
  out: {
    marginTop: 4,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    backgroundColor: '#ff0000',
    borderRadius: BALL.RADIUS,
  },
});

const getCounts = (balls, outs) => {
  const ret = {
    balls: 0,
    strikes: 0,
  };
  balls.forEach((ball) => {
    if (ball.judge === 'ball') {
      if (ret.balls < 4) ret.balls += 1;
    } else if (ball.judge === 'strike') {
      if (ret.strikes < 3) ret.strikes += 1;
    } else if (ball.judge === 'foul') {
      if (ret.strikes < 2) ret.strikes += 1;
    }
  });
  if (outs) ret.outs = outs;
  return ret;
};

export default class CountsBoardComponent extends Component<{}> {
  static propTypes = {
    balls: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
    })),
    outs: PropTypes.number,
  }
  static defaultProps = {
    balls: [],
    outs: 0,
  }

  /*
  constructor(props) {
    super(props);
  }
  */

  render() {
    const counts = getCounts(this.props.balls, this.props.outs);
    const ballsView = [0, 1, 2, 3].map((i) => {
      const view = i < counts.balls ? (
        <View
          key={`COUNTS_BOARD_BALL_${i + 1}`}
          style={styles.ballCell}
        >
          <View style={styles.ball} />
        </View>
      ) : (
        <View
          key={`COUNTS_BOARD_BALL_${i + 1}`}
          style={styles.ballCell}
        />
      );
      return view;
    });
    const strikesView = [0, 1, 2, 3].map((i) => {
      const view = i < counts.balls ? (
        <View
          key={`COUNTS_BOARD_STRIKE_${i + 1}`}
          style={styles.ballCell}
        >
          <View style={styles.strike} />
        </View>
      ) : (
        <View
          key={`COUNTS_BOARD_STRIKE_${i + 1}`}
          style={styles.ballCell}
        />
      );
      return view;
    });
    const outsView = [0, 1, 2, 3].map((i) => {
      const view = i < counts.outs ? (
        <View
          key={`COUNTS_BOARD_OUT_${i + 1}`}
          style={styles.ballCell}
        >
          <View style={styles.out} />
        </View>
      ) : (
        <View
          key={`COUNTS_BOARD_OUT_${i + 1}`}
          style={styles.ballCell}
        />
      );
      return view;
    });

    return (
      <View style={styles.body}>
        <View style={styles.inner}>
          <View style={styles.row}>
            <View style={styles.rowHeader}>
              <Text style={styles.rowHeaderText}>B</Text>
            </View>
            {ballsView}
          </View>
          <View style={styles.row}>
            <View style={styles.rowHeader}>
              <Text style={styles.rowHeaderText}>S</Text>
            </View>
            {strikesView}
          </View>
          <View style={styles.row}>
            <View style={styles.rowHeader}>
              <Text style={styles.rowHeaderText}>O</Text>
            </View>
            {outsView}
          </View>
        </View>
      </View>
    );
  }
}
