import React from 'react';
import UserAuthenticator from './UserAuthenticator';
import store from '../store';
import { addUserAction, removeUserAction } from '../actions';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { Redirect } from 'react-router-dom';

class NavigationBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstRender: true,
            redirect: false
        };
        this.getSessionUserFromServer = this.getSessionUserFromServer.bind(this);
    }

    componentWillMount(){
        if(this.state.firstRender){
            this.getSessionUserFromServer();
        }
    }

    getSessionUserFromServer(){
        fetch("/api/login/")
            .then(response => response.json())
            .then(response => {
                //console.log("Is user logged in on server? " + JSON.stringify(response));
                if(response != "null"){
                    
                    store.dispatch(
                        addUserAction(response)
                    );
                    this.setState({firstRender: false});
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    onLogout = () => {
        fetch("/api/login/logout/")
        .then(response => response.json())
        .then(response => {
            if(response == "200")
                store.dispatch(
                    removeUserAction()
                );
                this.setState({redirect: true})
        })
        .catch(err => {
            console.log(err);
        });
    }

    renderMenu() {
        const loggedInUserId = store.getState().user.id;
        //console.log("Is user logged in on frontend?" + loggedInUserId);
        if (loggedInUserId) {
            return (
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <Link to="/tickets/" className="nav-link">Bérleteim</Link>
                    </li>
                    <li class="nav-item">
                        <Link to="/businesses" className="nav-link">Vállalkozásaim</Link>
                    </li>
                    <li class="nav-item">
                        <GoogleLogout
                            onLogoutSuccess={this.onLogout}
                            buttonText="Kijelentkezés"
                            className="nav-link"
                            tag="a"
                            type=""
                        />
                    </li>
                </ul>
            );
        }
    }
    renderRedirect(){
        if (this.state.redirect) {
            this.setState({
                redirect: false
            });
            return <Redirect to='/' />
        }
    }
    renderAuthentication(){
        const loggedInUser = store.getState().user;
        if (!loggedInUser.id) {
            return <UserAuthenticator onLogin={this.getSessionUserFromServer} />
        }
        console.log(loggedInUser);
        return (
            <div>
                <div class="nav-profil-name">
                    <i class="fas fa-user"></i> {loggedInUser.email}
                </div>
                <div class="nav-profil-image text-center">
                    <img src={loggedInUser.profilePic} class="rounded" alt="Profil" />
                </div>
            </div>
        );
    }

    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom" data-spy="affix" data-offset-top="40">
                <div class="container">
                    <a class="navbar-brand" href="/">
                        <img src="/assets/image/logo.png" height="80" class="d-inline-block align-top" alt="Digitális Bérlet" />
                        <div class="navbar-site-title">
                            Digitális<br/>
                            Bérlet
                        </div>
                    </a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        {this.renderMenu()}
                        {this.renderAuthentication()}
                        {this.renderRedirect()}
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavigationBar;