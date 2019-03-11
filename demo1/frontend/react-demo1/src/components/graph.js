import React, { Component } from 'react';
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import 'datejs'



export class Graph extends Component {

  constructor(props) {
    super(props)

    this.url = 'https://6fllmbj50c.execute-api.us-east-1.amazonaws.com/dev/api/data/';
    this.state = {
      gadget: props.data.gadget,
      name: props.data.name,
      labels: [],
      values: []
    }

    
  }

  getData = () => {

    const fromMillis = 1552187323359;
    const toMillis = 1552187593939;

    this.url += this.state.gadget + '?fromMillis=' + fromMillis + '&toMillis=' + toMillis;

    axios.get(this.url)
      .then(resp => {
        const labels = resp.data.map(x=>new Date(x.timestamp).toString('HH:mm'));
        const values = resp.data.map(x=>x.value);
        this.setState({labels: labels, values: values});
      });
  }

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
  }

  render(){

    const data = {
      labels: this.state.labels,
      datasets: [
        {
          label: this.state.name,
          data: this.state.values,
          fill: false,          // Don't fill area under the line
          borderColor: 'green'  // Line color
        }
      ]
    }

    return (
      <Line data={data}/>
    );
  }
}

