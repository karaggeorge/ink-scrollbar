const {h, render, Component, Text} = require('ink');
const Scrollbar = require('../lib');

const items = Array.apply(null, Array(15)).map((s, i) => i);

class Example extends Component {
  constructor() {
    super();
    this.state = {
      cursor: 0,
    };

    this.getCursor = this.getCursor.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({cursor: (this.state.cursor + 1) % items.length});
    }, 300);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getCursor(i) {
    const {cursor} = this.state;
    if(i==cursor) {
      return '❯\u00A0';
    } else {
      return '\u00A0\u00A0';
    }
  }

  render() {
    return (
      <div>
        <br/>
        <br/>
        <Scrollbar show={5} current={this.state.cursor} padding={3} highlight>
          {items.map(i => <Text>{this.getCursor(i)}{i}</Text>)}
        </Scrollbar>
      </div>
    );
  }
}

const unmount = render(<Example/>);
