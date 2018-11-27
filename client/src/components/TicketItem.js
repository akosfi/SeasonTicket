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
            return <p>{item.occasionNumber} alkalmas</p>
        }
        return <p>{item.daysOfValidity} napos</p>
    }
    renderBuyButton(){
        if(this.props.buyable){            
            return <a href="#" onClick={() => {this.onItemBought(this.props.item.id)}} class="card-link">Buy</a>
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
            <div class="col item">
                <div class="card">
                    <img class="card-img-top" src={"https://picsum.photos/420/210?image=" + this.props.item.image} alt="Card image cap"></img>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">
                            {this.renderByTicketType(this.props.item)}
                            {this.renderPrice()}
                        </p>
                        <a href="#" class="card-link">Another link</a>
                        {this.renderBuyButton()}
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketItem;
                        