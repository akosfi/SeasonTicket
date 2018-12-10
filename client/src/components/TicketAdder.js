import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import _ from "lodash";
import store from '../store';
import HeaderSolid from './HeaderSolid';

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
            errors.push("Név mező nem lehet üres!");
        if(this.state.price == "")
            errors.push("Ár mező nem lehet üres!");
        if(this.state.validityValue == "")
            errors.push("Érvényesség tartama mező nem lehet üres!");

        if(this.state.isOccasional == null)
            errors.push("Kérem adja meg az érvényesség típusát!");

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
            <div class="input-group mb-4">
                <div class="input-group-prepend">
                    <span class="input-group-text">Érvényesség típusa:</span>
                </div>
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="radio" value="false" 
                        checked={this.state.isOccasional === "false"} 
                        onChange={this.handleRadioChange} />
                    </div>
                </div>
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        Napok
                    </div>
                </div>
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        <input type="radio" value="true" 
                        checked={this.state.isOccasional === "true"} 
                        onChange={this.handleRadioChange} />
                    </div>
                </div>
                <div class="input-group-prepend">
                    <div class="input-group-text">
                        Alkalmak
                    </div>
                </div>
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
                <HeaderSolid />
                <div class="container">
                    {this.renderRedirect()}
                    <div class="jumbotron">
                        <ul>
                            {this.state.errors.map(e => {
                                return <li>{e}</li>
                            })}
                        </ul>
                        <form onSubmit={this.handleSubmit}>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect01">Cég:</label>
                                </div>
                                <select class="custom-select" id="inputGroupSelect01" name="businessID" onChange={this.handleSelectChange} value={this.state.selectedBusiness} >
                                    {_.map(store.getState().businesses, business => {
                                        return <option value={business.id} >{business.name}</option>
                                    })} 
                                </select>
                            </div>                           

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <label class="input-group-text" for="inputGroupSelect02">Categória:</label>
                                </div>
                                <select class="custom-select" id="inputGroupSelect02" value={this.state.category} onChange={(e) => this.setState({category: e.target.value})}> 
                                    <option value="food">Étel, Ital</option>
                                    <option value="entertainment">Szórakoztatás</option>
                                    <option value="traveling">Közlekedés</option>
                                    <option value="health">Egézség</option>
                                    <option value="other">Egyéb</option>
                                </select>
                            </div>


                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Név:</span>
                                </div>
                                <input class="form-control" placeholder="Név" type="text" name="name" onChange={e => this.setState({name: e.target.value})} value={this.state.name}/>
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Ár:</span>
                                </div>
                                <input class="form-control" type="number" name="price" placeholder="Ár" onChange={e => this.setState({price: e.target.value})} value={this.state.price}/>
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Érvényesség tartama:</span>
                                </div>
                                <input class="form-control" type="number" name="validityValue" placeholder="Érvényesség tartama" onChange={e => this.setState({validityValue: e.target.value})} value={this.state.validityValue}/>
                            </div>

                            {this.renderTicketValidityInput()}

                            <input class="btn btn-primary" type="submit" value="Mentés" />
                            <Link className="btn btn-secondary ml-3" to='/businesses'>Vissza</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default TicketAdder;