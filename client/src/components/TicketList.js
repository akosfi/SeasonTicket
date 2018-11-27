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
            qIsOccasional: "",
            qCategory: "food"
        }
        this.onCategoryChange = this.onCategoryChange.bind(this);
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
        fetch("/api/tickets/filter/?name=" + this.state.qName
                                    + "&priceMin=" + this.state.qMinPrice
                                    + "&priceMax=" + this.state.qMaxPrice          
                                    + "&isOccasional=" + this.state.qIsOccasional
                                    + "&category=" + this.state.qCategory)
            .then(response => response.json())
            .then(response => {            
                store.dispatch(clearTicketsAction());
                store.dispatch(addTicketsAction(response));   
            });
    }
    onFilterChange(e){
        if(e.target.name == "qIsOccasional")
            e.target.value = e.target.checked;
        
        this.setState({[e.target.name]:  e.target.checked || e.target.value}, ()=>{
            this.filterTickets();
        });
    }
    onCategoryChange(e){
        this.setState({qCategory: e.target.value}, () => {
            this.filterTickets();
        })
    }
    renderSearch(){
        if(this.props.type == "ALL_TICKET_TO_BUY"){
            return (
                <div>
                    <input onChange={this.onFilterChange} type="text" name="qName" placeholder="Name" value={this.state.qName} />
                    <input onChange={this.onFilterChange} type="text" name="qMinPrice" placeholder="Minimum Price" value={this.state.qMinPrice} />
                    <input onChange={this.onFilterChange} type="text" name="qMaxPrice" placeholder="Maxiumum Price" value={this.state.qMaxPrice} />
                    <input onChange={this.onFilterChange} type="checkBox" name="qIsOccasional" value={this.state.qIsOccasional} />
                    <select onChange={this.onCategoryChange} value={this.state.qCategory} > 
                        <option value="food">Food</option>
                        <option value="dance">Dance</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="a">Majd bövitjük...</option>
                    </select>
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