import React from 'react';
import store from '../store';
import TicketItem from './TicketItem';
import TicketItemUser from './TicketItemUser';
import _ from "lodash"
import { addTicketsAction, clearTicketsAction } from '../actions';

class TicketList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            tickets: {},
            qName: "",
            qMinPrice: "",
            qMaxPrice: "",
            qIsOccasional: ""
        }
        this.renderTicketItemByType = this.renderTicketItemByType.bind(this);
        this.onFilterChange = this.onFilterChange.bind(this);
    }
    renderTicketItemByType(TYPE, ticket){
        switch (TYPE) {
            case "ALL_TICKET_TO_BUY":
                return <TicketItem id={ticket.id} item={ticket} buyable={this.props.buyable} />;
            break;
            case "USER_TICKETS":
                return <TicketItemUser id={ticket.id} item={ticket}></TicketItemUser>;
            break;    
        }
    }
    filterTickets(){

    }
    onFilterChange(e){
        if(e.target.name == "qIsOccasional")
            e.target.value = e.target.checked;
        
        this.setState({[e.target.name]:  e.target.checked || e.target.value}, ()=>{
            fetch("/api/tickets/filter/?name=" + this.state.qName
                                    + "&priceMin=" + this.state.qMinPrice
                                    + "&priceMax=" + this.state.qMaxPrice          
                                    + "&isOccasional=" + this.state.qIsOccasional)
            .then(response => response.json())
            .then(response => {            
                //console.log(JSON.stringify(response, null, 4));
                store.dispatch(clearTicketsAction());
                store.dispatch(addTicketsAction(response));
                /*store.dispatch(
                    addUserTicketsAction(response)                
                );   */     
            });
        });
    }
    renderSearch(){
        if(this.props.type == "ALL_TICKET_TO_BUY"){
            return (
                <div>
                    <input onChange={this.onFilterChange} type="text" name="qName" placeholder="Name" value={this.state.qName} />
                    <input onChange={this.onFilterChange} type="text" name="qMinPrice" placeholder="Minimum Price" value={this.state.qMinPrice} />
                    <input onChange={this.onFilterChange} type="text" name="qMaxPrice" placeholder="Maxiumum Price" value={this.state.qMaxPrice} />
                    <input onChange={this.onFilterChange} type="checkBox" name="qIsOccasional" value={this.state.qIsOccasional} />
                </div>
            );
        }
    }
    render(){
        return (
            <article class="container">
                { this.renderSearch() }
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