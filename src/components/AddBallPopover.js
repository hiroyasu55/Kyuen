/**
 * Add Ball Popover
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
  ListView,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import Ball from '../models/Ball';

const styles = StyleSheet.create({
  addBallPopup: {
    position: 'absolute',
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#808080',
    padding: 8,
    borderRadius: 4,
  },
  addBallPopupHeader: {
  },
  addBallPopupHeaderText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addBallPopupListRow: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#c0c0c0',
    marginBottom: 8,
  },
  addBallPopupListBall: {
    borderTopWidth: 1,
    borderStyle: 'solid',
    borderColor: '#c0c0c0',
    marginBottom: 8,
  },
  addBallPopupListText: {
    marginTop: 8,
    color: '#000000',
    fontSize: 16,
  },
});

export default class AddBallPopover extends Component<{}> {
  static propTypes = {
    isVisible: PropTypes.bool,
    x: PropTypes.number,
    y: PropTypes.number,
    balls: PropTypes.arrayOf(Ball.propTypes),
    onSelect: PropTypes.func,
  }
  static defaultProps = {
    isVisible: false,
    x: 0,
    y: 0,
    balls: [],
    onSelect: null,
  }

  constructor(props) {
    super(props);
    const data = [
      {
        action: 'swingStrike',
        text: 'ストライク - 空振り',
      },
      {
        action: 'strike',
        text: 'ストライク - 見逃し',
      },
      {
        action: 'foul',
        text: 'ファウル',
      },
      {
        action: 'ball',
        text: 'ボール',
      },
      {
        action: 'hit',
        text: '打球',
      },
      {
        action: 'cancel',
        text: 'キャンセル',
      },
    ];
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      items: ds.cloneWithRows(data),
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    // this.setListViewItems();
  }

  onListViewPress(item) {
    if (this.props.onSelect) {
      this.props.onSelect({
        action: item.action,
      });
    }
  }

  // <TouchableWithoutFeedback onPress={() => this.onListViewPress(item)}>
  renderItem(item) {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.onListViewPress(item)}
      >
        <View
          key={item.action}
          style={styles.addBallPopupListRow}
        >
          <Text style={styles.addBallPopupListText}>
            {item.text}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }

    return (
      <View
        style={[
          styles.addBallPopup,
          {
            left: this.props.x,
            top: this.props.y,
          },
        ]}
      >
        <View style={styles.addBallPopupHeader}>
          <Text style={styles.addBallPopupHeaderText}>
            {this.props.balls.length + 1}球目
          </Text>
        </View>
        <ListView
          dataSource={this.state.items}
          renderRow={this.renderItem}
        />
      </View>
    );
  }
}
