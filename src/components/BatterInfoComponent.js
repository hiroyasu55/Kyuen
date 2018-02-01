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
    width: '100%',
    height: 80,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#e0e0e0',
  },
  row: {
    flex: 3,
    flexDirection: 'row',
  },
  rowText: {
    textAlign: 'left',
    color: '#ffffff',
    fontSize: 14,
    marginLeft: 4,
    marginTop: 4,
  },
});

export default class BatterInfoComponent extends Component<{}> {
  static propTypes = {
    batter: Player.propTypes,
    battersIndex: PropTypes.number,
  }
  static defaultProps = {
    batter: null,
    battersIndex: 0,
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.row}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowText}>
              {this.props.battersIndex + 1}: {this.props.batter.name}
            </Text>
            <Text style={styles.rowText}>
              {this.props.batter.positionText()}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
