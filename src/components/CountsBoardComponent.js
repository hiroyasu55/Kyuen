/**
 * Counts Board Component
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
import Ball from '../models/Ball';

const BALL = {
  RADIUS: 6,
};
const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: 80,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e0e0e0',
    paddingTop: 4,
  },
  row: {
    flex: 3,
    flexDirection: 'row',
  },
  rowHeader: {
    flex: 5,
  },
  rowHeaderText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
    marginTop: 1,
  },
  ballCell: {
    flex: 5,
  },
  ball: {
    marginTop: 4,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    borderRadius: BALL.RADIUS,
    backgroundColor: Ball.colors('ball'),
  },
  strike: {
    marginTop: 2,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    borderRadius: BALL.RADIUS,
    backgroundColor: Ball.colors('strike'),
  },
  out: {
    marginTop: 2,
    width: BALL.RADIUS * 2,
    height: BALL.RADIUS * 2,
    borderRadius: BALL.RADIUS,
    backgroundColor: Ball.colors('out'),
  },
});

export default class CountsBoardComponent extends Component<{}> {
  static propTypes = {
    balls: PropTypes.number,
    strikes: PropTypes.number,
    outs: PropTypes.number,
  }
  static defaultProps = {
    balls: 0,
    strikes: 0,
    outs: 0,
  }

  /*
  constructor(props) {
    super(props);
  }
  */

  render() {
    const ballsView = [0, 1, 2, 3].map((i) => {
      const view = i < this.props.balls ? (
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
      const view = i < this.props.strikes ? (
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
      const view = i < this.props.outs ? (
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
    );
  }
}
