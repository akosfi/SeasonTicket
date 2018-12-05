import React from 'react';

class HeaderSolid extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return(           
            <header class="masthead text-white">                
                <div class="masthead-content">
                    <div class="container masthead-backlayer-solid">
                    </div>
                </div>             
            </header>
        );
    }
}

export default HeaderSolid;