import React from 'react';
import UserAuthenticator from './UserAuthenticator';
import store from '../store';
import { addUserAction, removeUserAction } from '../actions';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

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

    onLogout = () => {
        fetch("/api/login/logout/")
        .then(response => response.json())
        .then(response => {
            if(response == "200")
                store.dispatch(
                    removeUserAction()
                );
        })
        .catch(err => {
            console.log(err);
        });
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
                <Link to="/businesses">Vállalkozásaim</Link>
                <GoogleLogout
                    onLogoutSuccess={this.onLogout}
                    buttonText="Log Out"
                    className="nav-link"
                    tag="a"
                    type=""
                />
            </div>
        );
    }
    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom">
                <div class="container">
                    <a class="navbar-brand" href="/">Bérlet vásárlás</a>
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