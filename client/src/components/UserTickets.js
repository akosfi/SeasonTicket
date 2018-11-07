import React, { Component } from 'react';
import TicketList from './TicketList';
import store from '../store';

import { addUserTicketsAction } from '../actions';

class UserTickets extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        fetch("/api/transactions/" + store.getState().user.id)
        .then(response => response.json())
        .then(response => {            
            store.dispatch(
                addUserTicketsAction(response)                
            );        
        });
    }
    render(){
        return (
            <div>
              <TicketList source={store.getState().userTickets} buyable={store.getState().user.id != null}/>
            </div>
            
          );
    }
}
export default UserTickets;