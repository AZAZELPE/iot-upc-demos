import React, { Component } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

export class Title extends Component {
  render(){
    return (
      <Jumbotron>
        <Container>
          <h1>Gadgets IOT UPC</h1>
          <p>
            Pagina donde se muestran los gadgets IOT
          </p>
        </Container>
      </Jumbotron>
    );
  }
}