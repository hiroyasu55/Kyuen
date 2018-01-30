/**
 * Score Board Component
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

const SCORE_TITLES = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    // height: 30,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  headerRow: {
    flex: 0.8,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  headerTeamName: {
    flex: 3,
  },
  headerScore: {
    flex: 1,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  headerTotal: {
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
    margin: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  teamName: {
    flex: 3,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  teamNameText: {
    textAlign: 'left',
    color: '#ffffff',
    fontSize: 12,
    margin: 4,
  },
  score: {
    flex: 1,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  scoreTotal: {
    flex: 1,
  },
  scoreText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
    margin: 4,
  },
});

export default class ScoreBoardComponent extends Component<{}> {
  static propTypes = {
    teams: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  };
  static defaultProps = {
    teams: [
      {
        name: 'none',
      },
      {
        name: 'none',
      },
    ],
  };

  render() {
    const scores = [
      [0, 0, 1, 0, 0],
      [0, 3, 0, 0],
    ];

    const headerScores = SCORE_TITLES.map((title, i) => {
      return (
        <View
          key={`SCOREBOARD_HEADER_SCORE_${i}`}
          style={styles.headerScore}
        >
          <Text style={styles.headerText}>
            {title}
          </Text>
        </View>
      );
    });
    const rows = [0, 1].map((turn) => {
      const scoresView = SCORE_TITLES.map((_, i) => {
        const view = i < scores[turn].length ? (
          <View
            key={`SCOREBOARD_TOP_SCORE_${i}`}
            style={styles.score}
          >
            <Text style={styles.scoreText}>
              {scores[turn][i]}
            </Text>
          </View>
        ) : (
          <View
            key={`SCOREBOARD_ROW${turn}_SCORE${i}`}
            style={styles.score}
          />
        );
        return view;
      });

      const total = scores[turn].reduce((prev, current) => {
        return prev + current;
      });

      const row = (
        <View
          key={`SCOREBOARD_ROW${turn}`}
          style={styles.row}
        >
          <View style={styles.teamName}>
            <Text style={styles.teamNameText}>
              {this.props.teams[turn].name}
            </Text>
          </View>
          {scoresView}
          <View style={styles.scoreTotal}>
            <Text style={styles.scoreText}>
              {total}
            </Text>
          </View>
        </View>
      );

      return row;
    });

    return (
      <View style={styles.body}>
        <View style={styles.headerRow}>
          <View style={styles.headerTeamName} />
          {headerScores}
          <View style={styles.headerTotal}>
            <Text style={styles.headerText}>
              R
            </Text>
          </View>
        </View>
        {rows}
      </View>
    );
  }
}
