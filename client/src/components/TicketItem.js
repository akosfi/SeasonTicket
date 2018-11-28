import React from 'react';
import store from '../store';
import {deleteTicketAction} from '../actions';

class TicketItem extends React.Component{
    constructor(props) {
        super(props);

        this.onItemBought = this.onItemBought.bind(this);
        console.log("item");
    }

    deleteTicketItem(_id){
        fetch("/api/tickets" + '/' + _id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(res => {
            store.dispatch(
                deleteTicketAction(_id)
            );
        })
        .catch(err=>{
            console.log("ERROR: " + err)
        });

    }

    renderByTicketType(item){
        if(item.isOccasional){
            return <h6>{item.occasionNumber} alkalmas</h6>;
        }
        return <h6>{item.daysOfValidity} napos</h6>;
    }
    renderBuyButton(){
        if(this.props.buyable){            
            return <a href="#" onClick={() => {this.onItemBought(this.props.item.id)}} class="card-link">Vásárlás</a>
        }
    }
    renderPrice(){
        if(this.props.item.price !== undefined){
            return <h6 class="card-subtitle mb-2 text-muted">{this.props.item.price} Ft</h6>
        }
    }
    onItemBought(id){
        fetch("/api/tickets/buy/" + id)
        .then(response => response.json())
        .then(response => {            
            console.log("BUY RESPONSE" + response);
        });
    }
    render(){
        return(
            <div class="col-sm item">
                <div class="card">
                    <img class="card-img-top" src={"https://picsum.photos/420/210?image=" + this.props.item.image} alt="Ticket ilustration"></img>
                    <div class="card-cat-overlay">
                        <span class="badge badge-primary">{this.props.item.category}</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{this.props.item.name}</h5>
                        {this.renderByTicketType(this.props.item)}
                        {this.renderPrice()}
                        {this.renderBuyButton()}
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketItem;
                        