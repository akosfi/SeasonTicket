import React from 'react';
import GoogleLogin from 'react-google-login';

class NavigationBar extends React.Component{
    constructor(props){
        super(props);

    }
    
    onSuccessResponse = (response) => {
        console.log(response);
    }

    onFailureResponse = (response) => {
        console.log(response);
    } 
    render(){
        return(
            <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="#">Start Bootstrap</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <GoogleLogin
                                    clientId="139042500047-dj11k38rl5emkkcfmjn45aufs2essjqj.apps.googleusercontent.com"
                                    onSuccess={this.onSuccessResponse}
                                    onFailure={this.onFailureResponse}
                                    buttonText="Log In"
                                    className="nav-link"
                                    tag="a"
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