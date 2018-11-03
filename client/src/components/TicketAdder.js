import React from 'react';
import { Link, Redirect } from 'react-router-dom';


class TicketAdder extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.state = {
            name: "",
            price: "",
            validityValue: "",
            isOccasional: false,
            redirect: false
        };
    }
    handleSubmit(e){
        let ticketToSend = {
            name: this.state.name,
            price: this.state.price,
            isOccasional: this.state.isOccasional,
            businessID: 10,
            isActive: "true"
        }
        this.state.isOccasional ? 
            ticketToSend.occasionNumber = this.state.validityValue : 
            ticketToSend.daysOfValidity = this.state.validityValue; 

        fetch("/api/tickets", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketToSend)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.setState({ redirect: true });
        })
        .catch(err=>{
            console.log("err: " + err)
        });

        e.preventDefault();
    }

    renderTicketValidityInput(){
        return (
            <div>
                <label>
                    <input type="radio" value="false" 
                        checked={this.state.isOccasional === "false"} 
                        onChange={this.handleRadioChange} />
                    Days
                </label>
                <label>
                    <input type="radio" value="true" 
                        checked={this.state.isOccasional === "true"} 
                        onChange={this.handleRadioChange} />
                    Occasions
                </label>
            </div>
        );        
    }

    handleRadioChange(e){
        this.setState({isOccasional: e.target.value});
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/' />
        }
    }
    render(){
        return(
            <div>
                {this.renderRedirect()}
                <div className="jumbotron">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input className="form-control" type="text" name="name" onChange={e => this.setState({name: e.target.value})} value={this.state.name}/>
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input className="form-control" type="text" name="price" onChange={e => this.setState({price: e.target.value})} value={this.state.price}/>
                        </div>
                        <div className="form-group">
                            <label>Validity:</label>
                            <input className="form-control" type="text" name="validityValue" onChange={e => this.setState({validityValue: e.target.value})} value={this.state.validityValue}/>
                        </div>
                        <div className="form-group">
                            <label>Type:</label>
                            {this.renderTicketValidityInput()}
                        </div>
                        <input type="submit" value="Send" />
                    </form>
                    <Link to='/'> -Back </Link>
                </div>
            </div>
            
        );
    }
}


export default TicketAdder;