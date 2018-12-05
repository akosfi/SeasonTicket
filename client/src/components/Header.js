import React from 'react';

class Header extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(           
            <header class="masthead text-white">                
                <div class="masthead-content">
                    <div class="container masthead-backlayer">
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-6 masthead-clickable">
                                <h2 class="masthead-title">
                                    Digitális bérlet <strong>azonnal és bárhol</strong> egy érintéssel
                                </h2>
                                <p>
                                    Vásárolj Digitális bérletet a kedvenc szolgáltatásaid használatához. Alig párperc alatt kiválthatod és már használhatod is.
                                </p>
                                <button onClick={this.props.onButtonSelect} value="ticketbuy" type="button" class="btn btn-fancy">Bérlet vásárlás</button>
                            </div>
                            <div class="col-sm-4">
                                <img class="img-fluid" src="assets/image/mobile-ticket.png" />
                            </div>
                            <div class="col-sm-1"></div>
                        </div>
                    </div>
                    <div class="container-fluid masthead-overlay"></div>
                </div>             
            </header>
        );
    }
}

export default Header;