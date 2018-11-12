import React, { Component } from 'react';
import store from '../store';
import { Link } from 'react-router-dom';
import { addUserBusinessesAction } from '../actions';
import _ from "lodash";

class UserBusinesses extends Component {
    constructor(props){
        super(props);
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
    render(){
        return (
            <div>
                <Link to="/businesses/new">Vállalkozás hozzáadása</Link>
                <div>
                    <select>
                        {_.map(store.getState().businesses, business => {
                            return <option value={business.id} >{business.name}</option>
                        })} 
                    </select>
                </div>
            </div>
          );
    }
}
export default UserBusinesses;