import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: ""
    };
  }
  render() {
    return (
      <h1>Ola mundo</h1>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
