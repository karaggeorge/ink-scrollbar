const {h, Component, Text, renderToString} = require('ink');
const PropTypes = require('prop-types');
const Thumb = require('./thumb');

class Scrollbar extends Component {
  constructor(props, context) {
    super(props, context);

    const {current, show, children: {length}} = this.props;
    const limit = Math.min(show, length);

    const maxLength = Math.max(...this.props.children.map(option => renderToString(option).length));

    this.state = {
      viewpoint: Math.min(Math.max(0, current - Math.floor(limit / 2)), length - limit),
      maxLength
    };

    this.getScrollbar = this.getScrollbar.bind(this);
    this.getOption = this.getOption.bind(this);
    this.getSpacing = this.getSpacing.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {current, show, children: {length}} = nextProps;
    const limit = Math.min(show, length);

    if (current !== this.props.current) {
      const {viewpoint} = this.state;

      if (current < viewpoint) {
        this.setState({viewpoint: current});
      } else if (current >= viewpoint + limit) {
        this.setState({viewpoint: Math.min(current - limit + 1, length - limit)});
      }
    }
  }

  getScrollbar() {
    const {children: {length}, show} = this.props;
    const limit = Math.min(show, length);
    const height = Math.max(Math.round((limit / length) * limit), 1);
    const scrollbar = [];

    if (height === limit) {
      return scrollbar;
    }

    const {viewpoint} = this.state;
    const pos = Math.min(Math.round((viewpoint / length) * limit), limit - 1);

    for (let i = 0; i < height; i++) {
      scrollbar.push(pos + i);
    }
    return scrollbar;
  }

  getOption(option, index) {
    const {current, highlight} = this.props;
    const {viewpoint} = this.state;

    if (!highlight || current !== index + viewpoint) {
      return option;
    }

    const props = highlight === true ? {green: true} : highlight;

    return (<Text {...props}>{option}</Text>);
  }

  getSpacing(option) {
    return '\u00A0'.repeat(this.state.maxLength - renderToString(option).length + this.props.padding);
  }

  render(props, state) {
    const {thumbCharacter, children, show} = props;
    const {viewpoint} = state;
    const scrollbar = this.getScrollbar();
    const limit = Math.min(show, children.length);

    return (
      <span>
        {
          children.filter((option, i) => i >= viewpoint && i < viewpoint + limit).map(
            (option, i) => (
              <div>
                {this.getOption(option, i)}
                {this.getSpacing(option)}
                <Thumb thumbCharacter={thumbCharacter} show={scrollbar.includes(i)}/>
              </div>
            )
          )
        }
      </span>
    );
  }
}

Scrollbar.propTypes = {
  current: PropTypes.number,
  thumbCharacter: PropTypes.string,
  highlight: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  padding: PropTypes.number,
  show: PropTypes.number
};

Scrollbar.defaultProps = {
  thumbCharacter: '┃',
  highlight: false,
  padding: 1,
  show: 1,
  current: 0
};

module.exports = Scrollbar;
