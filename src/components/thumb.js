const {h} = require('ink');
const PropTypes = require('prop-types');

const Thumb = ({thumbCharacter = '|', show}) => (
  <span>{show ? `\u00A0${thumbCharacter}` : '\u00A0'.repeat(thumbCharacter.length + 1)}</span>
);

Thumb.propTypes = {
  show: PropTypes.bool,
  thumbCharacter: PropTypes.string
};

Thumb.defaultProps = {
  thumbCharacter: '❙'
};

module.exports = Thumb;
