import React from 'react';
import store from '../store';
import TicketItem from './TicketItem';
import TicketItemUser from './TicketItemUser';
import _ from "lodash"


class TicketList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tickets: {}
        }
        this.renderTicketItemByType = this.renderTicketItemByType.bind(this);
    }
    renderTicketItemByType(TYPE, ticket){
        switch (TYPE) {
            case "ALL_TICKET_TO_BUY":
                console.log("swithc");
                return <TicketItem id={ticket.id} item={ticket} buyable={this.props.buyable} />;
            break;
            case "USER_TICKETS":
                return <TicketItemUser id={ticket.id} item={ticket}></TicketItemUser>;
            break;
            
                
        }
    }
    render(){
        return (
            <article class="container">
                <div class="row">
                    {_.map(this.props.source, ticket => {
                        ticket.image = Math.round(Math.random()*400+112);          
                        return this.renderTicketItemByType(this.props.type, ticket);                       
                    })}
                </div>
            </article>
        )
    }


}

export default TicketList;