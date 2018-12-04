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
            qCategory: ""
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
        if (this.props.type == "ALL_TICKET_TO_BUY") {

            var userMessage = store.getState().user.id ? "Kattins a 'Vásárlás' gombra a bérlet megvásárlásához!" : "Jelentkezz be bérlet megvárálásához!";
            
            return (
                <div class="jumbotron">
                    <h4>Bérletek szűrése</h4>
                    <h5>{userMessage}</h5>
                    <hr class="my-4"></hr>
                    <div class="row">
                        <div class="col-sm"> 
                            <input onChange={this.onFilterChange} type="text" name="qName" class="form-control" placeholder="Név" value={this.state.qName} />
                        </div>
                        <div class="col-sm">
                            <input onChange={this.onFilterChange} type="text" name="qMinPrice" class="form-control" placeholder="Minimum Ár" value={this.state.qMinPrice} />
                        </div>
                        <div class="col-sm">
                            <input onChange={this.onFilterChange} type="text" name="qMaxPrice" class="form-control" placeholder="Maxiumum Ár" value={this.state.qMaxPrice} />
                        </div>
                        <div class="col-sm">
                            <input onChange={this.onFilterChange} type="checkbox" name="qIsOccasional" id="isOccasionalCheckbox" class="form-check-input" value={this.state.qIsOccasional} />
                            <label class="form-check-label" for="isOccasionalCheckbox">Alkalmankénti bérlet?</label>
                        </div>
                        <div class="col-sm">
                            <select onChange={this.onCategoryChange} value={this.state.qCategory} class="form-control" > 
                                <option value="">Összes</option>
                                <option value="food">Étel, Ital</option>
                                <option value="entertainment">Szórakoztatás</option>
                                <option value="traveling">Közlekedés</option>
                                <option value="health">Egézség</option>
                                <option value="other">Egyéb</option>
                            </select>
                        </div>
                    </div>                    
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
                        ticket.image = ticket.id;//Math.round(Math.random()*400+112);          
                        return this.renderTicketItemByType(this.props.type, ticket);                       
                    })}
                </div>
            </article>
        )
    }


}

export default TicketList;