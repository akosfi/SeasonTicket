import React from 'react';
import store from '../store';
import TicketItem from './TicketItem';
import _ from "lodash"


class TicketList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tickets: {}
        }
    }
    componentWillMount(){
        fetch("/api/tickets")
        .then(response => response.json())
        .then(response => {            
            store.dispatch({
                type: "ADD_TICKETS",
                payload: {
                    tickets: response
                }
            });            
        });
    }


    render(){
        return (
            <article class="container">
                <div class="row">
                    {_.map(store.getState().tickets, ticket => {
                        return <TicketItem id={ticket.id} item={ticket} buyable={store.getState().user.id != null} /> 
                    })}  
                </div>
            </article>
        )
    }


}

export default TicketList;