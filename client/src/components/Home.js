import React, { Component } from 'react';
import TicketList from './TicketList';
import store from '../store';
import { addTicketsAction } from '../actions';


class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    fetch("/api/tickets")
    .then(response => response.json())
    .then(response => {            
        store.dispatch(
            addTicketsAction(response)                
        );            
    });
  }

  render() {
    return (
      <div>
        <TicketList source={store.getState().tickets} buyable={store.getState().user.id != null}/>
      </div>
      
    );
  }

}

export default Home;
