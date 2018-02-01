import PropTypes from 'prop-types';

/* eslint-disable quote-props */
const POSITIONS = {
  'p': {
    shortText: '投',
    text: '投手',
  },
  'c': {
    shortText: '捕',
    text: '捕手',
  },
  '1b': {
    shortText: '一',
    text: '一塁手',
  },
  '2b': {
    shortText: '二',
    text: '二塁手',
  },
  '3b': {
    shortText: '三',
    text: '三塁手',
  },
  'ss': {
    shortText: '遊',
    text: '遊撃手',
  },
  'lf': {
    shortText: '左',
    text: '左翼手',
  },
  'cf': {
    shortText: '中',
    text: '中堅手',
  },
  'rf': {
    shortText: '右',
    text: '右翼手',
  },
  'dh': {
    shortText: '指',
    text: '指名打者',
  },
  'ph': {
    shortText: '打',
    text: '代打',
  },
  'pr': {
    shortText: '走',
    text: '代走',
  },
};
/* eslint-enable quote-props */

export default class Player {
  static propTypes = PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    backNumber: PropTypes.string,
    battingSide: PropTypes.string,
    pitchingSide: PropTypes.string,
    position: PropTypes.string,
  })

  constructor(params) {
    this.id = params.id || null;
    this.name = params.name || 'none';
    this.backNumber = params.backNumber || null;
    this.battingSide = params.battingSide || 'right';
    this.pitchingSide = params.pitchingSide || 'right';
    this.position = params.position || 'none';
  }

  positionText() {
    return this.position ? (POSITIONS[this.position].text || '-') : '-';
  }

  positionShortText() {
    return this.position ? (POSITIONS[this.position].shortText || '-') : '-';
  }
}
