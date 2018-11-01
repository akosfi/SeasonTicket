import React from 'react';

class Header extends React.Component{
    constructor(props){
        super(props);

    }
    

    render(){
        return(
            <header class="masthead text-center text-white">
                <div class="masthead-content">
                <div class="container">
                    <h1 class="masthead-heading mb-0">Bérlet vásárlás</h1>
                    <h2 class="masthead-subheading mb-0">Mindent egy helyen!</h2>
                    <a href="#" class="btn btn-primary btn-xl rounded-pill mt-5">Regisztrálok most ...</a>
                </div>
                </div>
                <div class="bg-circle-1 bg-circle"></div>
                <div class="bg-circle-2 bg-circle"></div>
                <div class="bg-circle-3 bg-circle"></div>
                <div class="bg-circle-4 bg-circle"></div>
            </header>
        );
    }
}

export default Header;