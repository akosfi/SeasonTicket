import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import _ from "lodash";
import store from '../store';
import {addTicketAction} from '../actions'

class TicketAdder extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.state = {
            name: "",
            price: "",
            validityValue: "",
            isOccasional: null,
            category: "food",
            redirect: false,
            errors: [],
            selectedBusiness: store.getState().businesses[Object.keys(store.getState().businesses)[0]].id
        };
    }
    validateInput(){
        let errors = [];
        if(this.state.name == "")
            errors.push("Name field can not be empty!");
        if(this.state.price == "")
            errors.push("Price field can not be empty!");
        if(this.state.validityValue == "")
            errors.push("Validity field can not be empty!");

        if(this.state.isOccasional == null)
            errors.push("You have to choose ticket type!");

        this.setState({
            errors: errors
        });

        if(errors.length > 0) return true;
        return false;
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.validateInput())
            return;

        let ticketToSend = {
            name: this.state.name,
            price: this.state.price,
            isOccasional: this.state.isOccasional,
            category: this.state.category,
            businessID: this.state.selectedBusiness,
            isActive: "true"
        }
        var isTrueSet = (this.state.isOccasional == 'true');
        isTrueSet ? 
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
            store.dispatch(
                addTicketAction(res)
            );
            this.setState({ redirect: true });
            
        })
        .catch(err=>{
            console.log("err: " + err)
        });

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
    handleSelectChange(e){
        if(e.target.value == this.state.selectedBusiness) return;

        this.setState({
            selectedBusiness: e.target.value
        });
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/businesses' />
        }
    }
    render(){
        return(
            <div>
                {this.renderRedirect()}
                <div className="jumbotron">
                    <ul>
                        {this.state.errors.map(e => {
                            return <li>{e}</li>
                        })}
                    </ul>
                    <form onSubmit={this.handleSubmit}>
                        <select name="businessID" onChange={this.handleSelectChange} value={this.state.selectedBusiness} >
                            {_.map(store.getState().businesses, business => {
                                return <option value={business.id} >{business.name}</option>
                            })} 
                        </select>
                        <select value={this.state.category} onChange={(e) => this.setState({category: e.target.value})}> 
                            <option value="food">Food</option>
                            <option value="dance">Dance</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="a">Majd bövitjük...</option>
                        </select>
                        <div className="form-group">
                            <label>Name:</label>
                            <input className="form-control" type="text" name="name" onChange={e => this.setState({name: e.target.value})} value={this.state.name}/>
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input className="form-control" type="number" name="price" onChange={e => this.setState({price: e.target.value})} value={this.state.price}/>
                        </div>
                        <div className="form-group">
                            <label>Validity:</label>
                            <input className="form-control" type="number" name="validityValue" onChange={e => this.setState({validityValue: e.target.value})} value={this.state.validityValue}/>
                        </div>
                        <div className="form-group">
                            <label>Type:</label>
                            {this.renderTicketValidityInput()}
                        </div>
                        <input type="submit" value="Send" />
                    </form>
                    <Link to='/businesses'> -Back </Link>
                </div>
            </div>
            
        );
    }
}


export default TicketAdder;