import React, { Component } from 'react';
import TicketList from './TicketList';



class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TicketList />
      </div>
      
    );
  }

}

export default Home;
