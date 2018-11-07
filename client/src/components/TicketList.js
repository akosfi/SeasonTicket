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
    
    render(){
        return (
            <article class="container">
                <div class="row">
                    {_.map(this.props.source, ticket => {
                        return <TicketItem id={ticket.id} item={ticket} buyable={this.props.buyable} /> 
                    })}  
                </div>
            </article>
        )
    }


}

export default TicketList;