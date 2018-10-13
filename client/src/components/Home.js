import React, { Component } from 'react';
import TicketList from './TicketList';
import Header from './Header';


class Home extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <TicketList />
    
      </div>
      
    );
  }

}

export default Home;
