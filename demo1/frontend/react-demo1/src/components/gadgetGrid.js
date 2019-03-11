import React, { Component } from 'react';
import { CardColumns, Container } from 'react-bootstrap';
import { Gadget } from './gadget'
import axios from 'axios'

export class GadgetGrid extends Component {

  constructor (props) {
    super(props);

    this.state = {
      gadgets: []
    };

    this.url = 'https://6fllmbj50c.execute-api.us-east-1.amazonaws.com/dev/api/gadget/'
    this.actualizar = this.actualizar.bind(this);
  }

  componentDidMount() {
    this.actualizar();
  }

  componentWillUnmount() {
  }

  actualizar = () => {
    axios.get(this.url)
      .then(resp => this.setState({gadgets: resp.data}));
  };

  render(){
    return (
      <Container>
        <CardColumns>
          {this.state.gadgets.map(gadget => {
            const data = {gadget:gadget, url:this.url};
            return <Gadget data={data} key={gadget.id}/>
          })}
        </CardColumns>
      </Container>
    );
  }
}