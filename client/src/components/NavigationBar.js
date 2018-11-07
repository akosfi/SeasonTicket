import React from 'react';
import UserAuthenticator from './UserAuthenticator';
import store from '../store';
import { addUserAction } from '../actions';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstRender: true
        };
    }

    componentWillMount(){
        if(this.state.firstRender){
            fetch("/api/login/")
            .then(response => response.json())
            .then(response => {
                if(response != "null"){
                    store.dispatch(
                        addUserAction(response)
                    );
                }
            })
            .catch(err => {
                console.log(err);
            });            
            this.setState({firstRender: false});
        }
    }

    renderAuthentication(){
        const loggedInUserId = store.getState().user.id;
        if(!loggedInUserId){
            return <UserAuthenticator />
        }
        return (
            <div>
                <p>Logged in. ID: {loggedInUserId}</p>
                <Link to="/tickets/">Bérleteim</Link>
            </div>
        );
    }
    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="#">Bérlet vásárlás</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    {this.renderAuthentication()}                    
                    
                </div>
            </nav>
        );
    }
}

export default NavigationBar;