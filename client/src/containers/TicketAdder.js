import React from 'react';
import store from '../store';

class TicketAdder extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            priceValue: ""
        };
    }
    handleSubmit(e){

        alert(this.state.priceValue);

        let ticketToSend = {
            price: this.state.priceValue
        }

        /*store.dispatch({
            type: "ADD_TICKET",
            payload: {
                
            }
        })*/

        fetch("https://localhost:44306/api/tickets", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({price: 5000, daysOfValidity: 40, isActive: true})
        })
        .then(res => res.json())
        .then(res => {
            console.log("EREDMENY: " + res)
        })
        .catch(err=>{
            console.log("ERROR: " + err)
        });


        
        e.preventDefault();
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <span>Price:</span>
                    <input type="text" name="price" onChange={e => this.setState({priceValue: e.target.value})} value={this.state.priceValue}/>
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }
}


export default TicketAdder;