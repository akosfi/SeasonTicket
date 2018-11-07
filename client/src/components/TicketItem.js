import React from 'react';
import store from '../store';
import {deleteTicketAction} from '../actions';

class TicketItem extends React.Component{
    constructor(props) {
        super(props);

        this.onItemBought = this.onItemBought.bind(this);
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
            return <p>{item.occasionNumber} alkalmas</p>
        }
        return <p>{item.daysOfValidity} napos</p>
    }
    renderBuyButton(){
        if(this.props.buyable){            
            return <button onClick={() => {this.onItemBought(this.props.item.id)}} type="button" class="btn btn-success">Buy</button>
        }
    }
    renderPrice(){
        if(this.props.item.price != undefined){
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
            <div class="col-3 item">
                <div class="card">
                    <img class="card-img-top" src="https://picsum.photos/420/210?image=436" alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">{this.props.item.name}</h5>
                        {this.renderPrice()}
                        {this.renderByTicketType(this.props.item)}
                        {this.renderBuyButton()}
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketItem;
                        