import React from 'react';
import store from '../store';

class TicketItem extends React.Component{
    constructor(props){
        super(props);

    }
    deleteTicketItem(_id){
        //deleete fetch
        store.dispatch({
            type: "DELETE_TICKET",
            payload: {
                id: _id
            }
        });


        fetch("https://localhost:44306/api/tickets" + '/' + _id, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(res => {
            console.log("EREDMENY: " + res)
        })
        .catch(err=>{
            console.log("ERROR: " + err)
        });

        
        
        
        //KEZELNI KELL MAJD A CUCCOST
    }

    render(){
        return(
            <div>
                Price: {this.props.item.price}
                daysOfValidity: {this.props.item.daysOfValidity}
                occasionNumber: {this.props.item.occasionNumber}
                isActive: {this.props.item.isActive ? "true" : "false"}
                <button onClick={()=>this.deleteTicketItem(this.props.id)}>asd</button>
            </div>
        );
    }
}

export default TicketItem;
                        