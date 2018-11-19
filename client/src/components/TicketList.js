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
                return <TicketItem id={ticket.id} item={ticket} buyable={this.props.buyable} />;
            case "USER_TICKETS":
            default:
                return <TicketItemUser id={ticket.id} item={ticket}></TicketItemUser>;
        }
    }
    render(){
        return (
            <article class="container">
                <div class="row">
                    <div class="pt-3 pb-3 owl-carousel owl-theme">
                        {_.map(this.props.source, ticket => {
                            ticket.image = Math.round(Math.random()*400+112);          
                            return this.renderTicketItemByType(this.props.type, ticket);                       
                        })}
                    </div>
                </div>
            </article>
        )
    }


}

export default TicketList;