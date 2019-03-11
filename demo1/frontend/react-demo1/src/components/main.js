import React, { Component } from 'react';
import {Title} from './title'
import { GadgetGrid } from './gadgetGrid';

export class Main extends Component {
  render(){
    return (
      <React.Fragment>
        <Title />
        <GadgetGrid />
      </React.Fragment>
    );
  }
}