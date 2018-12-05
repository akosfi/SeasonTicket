import React, { Component } from 'react';
import store from '../store';
import HeaderSolid from './HeaderSolid';
import { Link } from 'react-router-dom';
import { addUserBusinessesAction } from '../actions';
import _ from "lodash";

class UserBusinesses extends Component {
    constructor(props){
        super(props);

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.renderOwnTickets = this.renderOwnTickets.bind(this);
        this.state = {
            selectedBusiness: "all"
        }
    }
    componentWillMount(){
        fetch("/api/businesses/user")
        .then(response => response.json())
        .then(response => {     
            console.log(response);
            store.dispatch(
                addUserBusinessesAction(response)                
            );      
        });
    }
    handleSelectChange(e){
        if(e.target.value == this.state.selectedBusiness) return;

        this.setState({
            selectedBusiness: e.target.value
        });
    }
    renderOwnTickets(){
        return (
            <ul>
                {_.map(store.getState().tickets, ticket =>{
                    if(this.state.selectedBusiness == "all"){
                        return _.map(store.getState().businesses, b =>{
                            if(b.id == ticket.businessID)
                                return <li>{ticket.name}</li> 
                        });
                    }
                    else{
                        if(ticket.businessID == this.state.selectedBusiness)
                            return <li>{ticket.name}</li>
                    }
                })}
            </ul>
        );

    }

    renderBusinessJumbotron() {
        return (<div class="container mb-5">
        <div class="inner-action">
          <div class="content-text">
            <h3 class="title">Indítsd be saját vállalkozásodat a Digitális Bérlettel! Kezdj bele most ...</h3>
            <div class="call-action-button">
                <Link to="/businesses/new" className="btn btn-fancy">
                    Vállalkozás hozzáadása
                </Link>
            </div>
          </div>
        </div>
      </div>);
    }

    render(){
        return (
            <div>
                <HeaderSolid />
                {this.renderBusinessJumbotron()}
                <div class="container">
                    <div class="jumbotron">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">
                                    <i class="fas fa-search"></i>
                                </label>
                            </div>
                            <select onChange={this.handleSelectChange} value={this.state.selectedBusiness} class="custom-select" id="inputGroupSelect01" >
                                <option value="all">Összes</option>
                                {_.map(store.getState().businesses, business => {
                                    return <option value={business.id} >{business.name}</option>
                                })} 
                            </select>
                            <div class="input-group-append">
                                <Link to="/tickets/add" className="btn btn-primary">
                                    <i class="fas fa-plus"></i> Bérlet felvétel
                                </Link>                            
                            </div>
                        </div>
                    </div>
                    <div>
                        {this.renderOwnTickets()}
                    </div>
                </div>
            </div>
          );
    }
}
export default UserBusinesses;