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

const INNING_TITLES = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    // height: 30,
    backgroundColor: '#000000',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  teamNameCol: {
    flex: 4,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  teamNameHeader: {
    flex: 0.8,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  teamName: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  teamNameText: {
    textAlign: 'left',
    color: '#ffffff',
    fontSize: 12,
    margin: 4,
  },
  scoreCol: {
    flex: 1,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  scoreHeader: {
    flex: 0.8,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  scoreHeaderText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
    margin: 2,
  },
  score: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  scoreText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
    margin: 4,
  },
  totalCol: {
    flex: 1,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  totalHeader: {
    flex: 0.8,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  totalHeaderText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
    margin: 2,
  },
  total: {
    flex: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ffffff',
  },
  totalText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 12,
    margin: 4,
  },
  currentScore: {
    backgroundColor: '#000080',
  },
});

const culcTotals = (scores) => {
  const totals = [0, 0];
  scores.forEach((inningScores) => {
    [0, 1].forEach((turn) => {
      if (inningScores.length > turn) totals[turn] += inningScores[turn];
    });
  });
  return totals;
};

export default class ScoreBoardComponent extends Component<{}> {
  static propTypes = {
    teams: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    inning: PropTypes.number,
    turn: PropTypes.number,
    scores: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
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
    inning: -1,
    turn: -1,
    scores: [],
  };

  render() {
    const teamNameCols = this.props.teams.map((team, turn) => {
      return (
        <View
          key={`SCOREBOARD_TEAMNAME_${turn}`}
          style={styles.teamName}
        >
          <Text style={styles.teamNameText}>
            {team.name}
          </Text>
        </View>
      );
    });

    const scoreCols = INNING_TITLES.map((title, inning) => {
      const scoreCells = [0, 1].map((turn) => {
        return (
          <View
            key={`SCOREBOARD_SCORE_${inning}_${turn}`}
            style={[
              styles.score,
              inning === this.props.inning && turn === this.props.turn
                ? styles.currentScore
                : null,
            ]}
          >
            <Text style={styles.scoreText}>
              {this.props.scores.length > inning
                && this.props.scores[inning].length > turn
                ? this.props.scores[inning][turn]
                : ''}
            </Text>
          </View>
        );
      });
      return (
        <View
          key={`SCOREBOARD_SCORE_${inning}`}
          style={styles.scoreCol}
        >
          <View style={styles.scoreHeader}>
            <Text style={styles.scoreHeaderText}>
              {title}
            </Text>
          </View>
          {scoreCells}
        </View>
      );
    });
    const totals = culcTotals(this.props.scores);
    const totalCells = totals.map((total, turn) => {
      return (
        <View
          key={`SCOREBOARD_TOTAL_${turn}`}
          style={styles.total}
        >
          <Text style={styles.totalText}>
            {total}
          </Text>
        </View>
      );
    });

    return (
      <View style={styles.body}>
        <View style={styles.teamNameCol}>
          <View style={styles.teamNameHeader} />
          {teamNameCols}
        </View>
        {scoreCols}
        <View style={styles.totalCol}>
          <View style={styles.totalHeader}>
            <Text style={styles.totalHeaderText}>
              R
            </Text>
          </View>
          {totalCells}
        </View>
      </View>
    );
  }
}
