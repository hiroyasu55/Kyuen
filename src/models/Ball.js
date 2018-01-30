import PropTypes from 'prop-types';

export default class Ball {
  static propTypes = PropTypes.shape({
    type: PropTypes.string,
    judge: PropTypes.string,
    pointX: PropTypes.number,
    pointY: PropTypes.number,
  })

  static colors = ((judge) => {
    switch (judge) {
      case 'ball':
        return '#008000';
      case 'strike':
        return '#ffa500';
      case 'out':
        return '#ff0000';
      default:
        return '#c0c0c0';
    }
  })

  static styles = (name) => {
    switch (name) {
      case 'swingStrike':
        return {
          backgroundColor: Ball.colors('strike'),
          borderColor: Ball.colors('strike'),
        };
      case 'strike':
        return {
          backgroundColor: Ball.colors('strike'),
          borderColor: Ball.colors('strike'),
        };
      case 'foul':
        return {
          backgroundColor: Ball.colors('strike'),
          borderColor: '#ff0000',
        };
      case 'hit':
        return {
          backgroundColor: '#0000c0',
          borderColor: '#0000c0',
        };
      case 'out':
        return {
          backgroundColor: Ball.colors('out'),
          borderColor: Ball.colors('out'),
        };
      case 'ball':
        return {
          backgroundColor: Ball.colors('ball'),
          borderColor: Ball.colors('ball'),
        };
      default:
        return {
          backgroundColor: '#202020',
          borderColor: '#202020',
        };
    }
  }

  constructor(params) {
    this.type = params.type || 'none';
    this.judge = params.judge || 'none';
    this.pointX = params.pointX || 0;
    this.pointY = params.pointY || 0;
  }
}
