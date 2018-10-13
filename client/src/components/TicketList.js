import React from 'react';
import store from '../store';
import TicketItem from './TicketItem';

class TicketList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            tickets: {}
        }
    }
    componentWillMount(){
        fetch("https://localhost:44306/api/tickets")
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
        return (<div>            
                {Object.keys(store.getState().tickets).map(function(key) {
                    return <TicketItem id={key} item={store.getState().tickets[key]} /> 
                })}                
        </div>)
    }


}

export default TicketList;