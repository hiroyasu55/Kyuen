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
  ScrollView,
  ListView,
} from 'react-native';
import PropTypes from 'prop-types';
import Ball from '../models/Ball';

const styles = StyleSheet.create({
  body: {
    width: '100%',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#c0c0C0',
  },
  listRow: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#c0c0c0',
  },
  index: {
    flex: 1,
  },
  ball: {
    flex: 5,
  },
  listRowText: {
    color: '#ffffff',
    fontSize: 13,
    margin: 4,
  },
});

export default class BallsListComponent extends Component<{}> {
  static propTypes = {
    balls: PropTypes.arrayOf(Ball.propTypes),
  }
  static defaultProps = {
    balls: [
      new Ball({
        type: 'strike',
      }),
    ],
  }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    const items = this.props.balls.map((player, index) => {
      return {
        index,
        player,
      };
    });
    this.state = {
      items: ds.cloneWithRows(items),
    };
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(item) {
    return (
      <View
        key={`BALLS_LIST_${item.index}`}
        style={[
          styles.listRow,
        ]}
      >
        <View style={styles.index}>
          <Text style={styles.listRowText}>
            {item.index + 1}
          </Text>
        </View>
        <View style={styles.ball}>
          <Text style={styles.listRowText}>
            {item.ball.type}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.body}>
        <ScrollView style={{ height: 100 }}>
          <ListView
            dataSource={this.state.items}
            renderRow={this.renderItem}
          />
        </ScrollView>
      </View>
    );
  }
}
