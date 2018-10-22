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
        let ticketToSend = {
            price: this.state.priceValue,
            daysOfValidity: this.state.daysOfValidity,
            occasionNumber: this.state.occasionNumber,
            businessID: 10
        }

        fetch("https://localhost:44306/api/tickets", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketToSend)
        })
        .then(res => res.json())
        .then(res => {
            console.log("result: " + res)
        })
        .catch(err=>{
            console.log("err: " + err)
        });

        e.preventDefault();
    }

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <span>Price:</span>
                    <input type="text" name="price" onChange={e => this.setState({priceValue: e.target.value})} value={this.state.priceValue}/>
                    <br/><span>Days of Validity:</span>
                    <input type="text" name="daysOfValidity" onChange={e => this.setState({daysOfValidity: e.target.value})} value={this.state.daysOfValidity}/>
                    <br/><span>Number of Occasions:</span>
                    <input type="text" name="occasionNumber" onChange={e => this.setState({occasionNumber: e.target.value})} value={this.state.occasionNumber}/>
                    <input type="submit" value="Send" />
                </form>
            </div>
        );
    }
}


export default TicketAdder;