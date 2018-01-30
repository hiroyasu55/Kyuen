/**
 * Batter Information Component
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
import Player from '../models/Player';

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#000000',
    width: 120,
    height: 80,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e0e0e0',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    margin: 4,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  rowText: {
    textAlign: 'left',
    color: '#ffffff',
    fontSize: 16,
  },
});

export default class BatterInfoComponent extends Component<{}> {
  static propTypes = {
    batters: PropTypes.arrayOf(Player.propTypes),
    battersIndex: PropTypes.number,
  }
  static defaultProps = {
    batters: [],
    battersIndex: 0,
  }

  /*
  constructor(props) {
    super(props);
  }
  */

  render() {
    const batter = this.props.batters[this.props.battersIndex];
    return (
      <View style={styles.body}>
        <View style={styles.inner}>
          <View style={styles.row}>
            <View style={styles.rowHeader}>
              <Text style={styles.rowText}>
                {this.props.battersIndex + 1}: {batter.name} {batter.backNumber ? `[${batter.backNumber}]` : ''}
              </Text>
              <Text style={styles.rowText}>
                {batter.positionText()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
