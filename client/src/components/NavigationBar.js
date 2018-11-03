import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

class NavigationBar extends React.Component{
    constructor(props){
        super(props);

    }

    serverUrl = "https://localhost:5001/api/login";
    
    onSuccessResponse = (response) => {
        console.log(response);

        fetch("/api/login", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "tokenId": response.tokenId,
                "googleId": response.googleId
            })
          })
          .then(response => response.text())
          .then(response => {
            console.log('Request succeeded with JSON response:' +  response + "!");
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });        
    }

    onFailureResponse = (response) => {
        console.log("onFailureResponse");
        console.log(response);
    }

    onLogout = (response) => {
        console.log("onLogout");
        console.log(response);
    }

    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="#">Bérlet vásárlás</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <GoogleLogin
                                    clientId="869554201067-8jd4ihc99gpqoeu9gpgr7l4jtovi4ugc.apps.googleusercontent.com"
                                    onSuccess={this.onSuccessResponse}
                                    onFailure={this.onFailureResponse}
                                    buttonText="Log In"
                                    className="nav-link"
                                    tag="a"
                                    type=""
                                />
                            </li>
                            <li class="nav-item">
                                <GoogleLogout
                                    onLogoutSuccess={this.onLogout}
                                    buttonText="Log Out"
                                    className="nav-link"
                                    tag="a"
                                    type=""
                                />
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavigationBar;