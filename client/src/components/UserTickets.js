import React, { Component } from 'react';
import TicketList from './TicketList';
import store from '../store';
import HeaderSolid from './HeaderSolid';
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
                <HeaderSolid />
                <TicketList source={store.getState().userTickets} type="USER_TICKETS"/>
            </div>
        );
    }
}
export default UserTickets;