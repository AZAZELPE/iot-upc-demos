import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Graph } from './graph'
import Popup from "reactjs-popup";

export class Gadget extends Component {

  constructor (props) {
    super(props);

    this.gadget = props.data.gadget;
    this.url = props.data.url;

    this.state = {
      id: this.gadget.id,
      name: this.gadget.name,
      ubicacion: this.gadget.ubicacion
    };

    //this.actualizar = this.actualizar.bind(this);
  }

  graph = () => {
    const graphProps = {
      gadget:this.state.id,
      name: this.state.name
    }
    return (
      <Popup trigger={
        <Button variant="outline-primary">Gráfica</Button>
      } modal
      closeOnDocumentClick>
        <Graph data={graphProps}/>
      </Popup>
    );
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  // actualizar = () => {
  //   axios.get(this.url + this.gadget.id)
  //     .then(resp => this.setState(resp.data));
  // };

  render(){
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{this.state.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Sensor</Card.Subtitle>
          <Card.Text>
            El sensor esta ubicado en {this.state.ubicacion}
          </Card.Text>
          {this.graph()}
          
        </Card.Body>
      </Card>
    );
  }
}