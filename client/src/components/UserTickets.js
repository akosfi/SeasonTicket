import React, { Component } from 'react';
import TicketList from './TicketList';
import store from '../store';
import { Link } from 'react-router-dom';
import { addUserTicketsAction } from '../actions';

class UserTickets extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount(){
        fetch("/api/transactions/")
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
                <div>
                    <TicketList source={store.getState().userTickets} type="USER_TICKETS"/>
                </div>
            </div>
            
            
          );
    }
}
export default UserTickets;