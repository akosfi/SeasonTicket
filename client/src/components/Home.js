import React, { Component } from 'react';
import TicketList from './TicketList';
import Header from './Header';
import NavigationBar from './NavigationBar';
import Footer from './Footer';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <Header />
        <TicketList />
        <Footer />
      </div>
      
    );
  }

}

export default Home;
