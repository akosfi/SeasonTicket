import React, { Component } from 'react';
import store from '../store';
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
    render(){
        return (
            <div>
                <Link to="/businesses/new">Vállalkozás hozzáadása</Link>
                <div>
                    <select onChange={this.handleSelectChange} value={this.state.selectedBusiness} >
                        <option value="all">Összes</option>
                        {_.map(store.getState().businesses, business => {
                            return <option value={business.id} >{business.name}</option>
                        })} 
                    </select>
                </div>
                <Link to="/tickets/add">Bérlet felvétel</Link>
                <div>
                    {this.renderOwnTickets()}
                </div>
            </div>
          );
    }
}
export default UserBusinesses;