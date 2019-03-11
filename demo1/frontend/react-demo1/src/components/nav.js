import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export class Nav extends Component {
  render(){
    return (
      <Navbar bg="dark" expand="lg" variant='dark'>
        <Navbar.Brand href="#">UPC-IOT</Navbar.Brand>
      </Navbar>
    );
  }
}