import { GoogleLogin } from 'react-google-login';
import store from '../store';
import React from 'react';

class UserAuthenticator extends React.Component{
    constructor(props){
        super(props);
    }
    onSuccessResponse = (response) => {
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
            store.dispatch({
                type: "ADD_USER",
                payload: {
                    id: response
                }
            });
          })
          .catch(function (error) {
            console.log('Request failed', error);
          });        
    }

    onFailureResponse = (response) => {
        console.log("onFailureResponse");
        console.log(response);
    }

    

    render(){
        return (
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <GoogleLogin
                            //dev client_id: 869554201067-8jd4ihc99gpqoeu9gpgr7l4jtovi4ugc.apps.googleusercontent.com
                            //prod client_id : 403345559269-hfu9slouel589rniqd27bnongb2nkk43.apps.googleusercontent.com
                            clientId="403345559269-hfu9slouel589rniqd27bnongb2nkk43.apps.googleusercontent.com"
                            onSuccess={this.onSuccessResponse}
                            onFailure={this.onFailureResponse}
                            buttonText="Log In"
                            className="nav-link"
                            tag="a"
                            type=""
                        />
                    </li>
                    
                </ul>
            </div>
        );
    }
}
export default UserAuthenticator;