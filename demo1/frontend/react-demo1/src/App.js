import React, { Component } from 'react';
import {Nav} from './components/nav'
import {Footer} from './components/footer'
import {Main} from './components/main'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        < Nav />
        < Main />
        < Footer />
      </React.Fragment>
    );
  }
}

export default App;
