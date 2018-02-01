/**
 * Current Players List Component
 * @flow
 */

import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';
import PropTypes from 'prop-types';
import Team from '../models/Team';
import Player from '../models/Player';

const styles = StyleSheet.create({
  body: {
    width: '100%',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#c0c0C0',
  },
  header: {
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderColor: '#c0c0C0',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 'bold',
    margin: 4,
  },
  listRow: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#c0c0c0',
  },
  order: {
    flex: 1,
  },
  playerPosition: {
    flex: 1,
  },
  playerName: {
    flex: 4,
  },
  listRowText: {
    color: '#ffffff',
    fontSize: 13,
    margin: 4,
  },
  currentRow: {
    backgroundColor: '#000080',
  },
});

export default class CurrentPlayersListComponent extends Component<{}> {
  static propTypes = {
    team: Team.propTypes,
    currentPlayers: PropTypes.arrayOf(Player.propTypes),
    battersIndex: PropTypes.number,
  }
  static defaultProps = {
    team: null,
    currentPlayers: [],
    battersIndex: null,
  }

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    const items = this.props.currentPlayers.map((player, order) => {
      return {
        order,
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
        key={`CURRENT_PLAYERS_LIST_${item.order}`}
        style={[
          styles.listRow,
          item.order === this.props.battersIndex ? styles.currentRow : null,
        ]}
      >
        <View style={styles.order}>
          <Text style={styles.listRowText}>
            {item.order + 1}
          </Text>
        </View>
        <View style={styles.playerPosition}>
          <Text style={styles.listRowText}>
            {item.player.positionShortText()}
          </Text>
        </View>
        <View style={styles.playerName}>
          <Text style={styles.listRowText}>
            {item.player.name}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.body}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {this.props.team.name}
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
