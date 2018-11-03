import React from 'react';
import store from '../store';

class TicketItem extends React.Component{
    constructor(props) {
        super(props);
    }

    deleteTicketItem(_id){
        fetch("/api/tickets" + '/' + _id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(res => {
            store.dispatch({
                type: "DELETE_TICKET",
                payload: {
                    id: _id
                }
            });
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
    render(){
        return(
            <div class="col-3 item">
                <div class="card">
                    <img class="card-img-top" src="https://picsum.photos/420/210?image=436" alt="Card image cap"/>
                    <div class="card-body">
                        <h5 class="card-title">{this.props.item.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{this.props.item.price} Ft</h6>
                        {this.renderByTicketType(this.props.item)}
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketItem;
                        