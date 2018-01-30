import PropTypes from 'prop-types';

/* eslint-disable quote-props */
const POSITIONS = {
  'p': '投手',
  'c': '捕手',
  '1b': '一塁手',
  '2b': '二塁手',
  '3b': '三塁手',
  'ss': '遊撃手',
  'lf': '左翼手',
  'cf': '中堅手',
  'rf': '右翼手',
  'ph': '代打',
  'pr': '代走',
  'dh': '指名打者',
};
/* eslint-enable quote-props */

export default class Player {
  static propTypes = PropTypes.shape({
    name: PropTypes.string,
    backNumber: PropTypes.string,
    battingSide: PropTypes.string,
    pitchingSide: PropTypes.string,
    position: PropTypes.string,
  })

  constructor(params) {
    this.name = params.name || 'none';
    this.backNumber = params.backNumber || null;
    this.battingSide = params.battingSide || 'right';
    this.pitchingSide = params.pitchingSide || 'right';
    this.position = params.position || 'none';
  }

  positionText() {
    return POSITIONS[this.position] || '？';
  }
}
