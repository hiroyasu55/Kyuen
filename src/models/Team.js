import PropTypes from 'prop-types';
import Player from './Player';

export default class Team {
  static propTypes = PropTypes.shape({
    name: PropTypes.string,
    players: PropTypes.arrayOf(Player.propTypes),
  })

  constructor(params) {
    this.name = params.name || 'none';
    this.players = params.players || [];
  }
}
