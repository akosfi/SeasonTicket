import React, { Component } from 'react';
import TicketList from './components/TicketList';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <TicketList />
    );
  }

}

export default App;
