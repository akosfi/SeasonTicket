import React from 'react';


class DeatiledTicketView extends React.Component{
    constructor(props){
        super(props);

    
        this.state = {
            response: null
        }
    }
    
    componentWillMount(){
        fetch("/api/transactions/" + this.props.match.params.id)
        .then(response => response.json())
        .then(response => {            
            this.setState({response});
        });
    }

    renderData(){
        if(this.state.response != null){
            return (
                <div>
                    <p>{this.state.response.registrationDate}</p>
                    <p>{this.state.response.occasionNumber}</p>
                    <p>{this.state.response.name}</p>
                    <p>{this.state.response.daysOfValidity}</p>
                    <p>{this.state.response.isOccasional}</p>
                    <p>{this.state.response.price}</p>
                    <p>{this.state.response.businessName}</p>
                    <img src={this.state.response.qrURL}/>
                </div>
            );
        }       
    }

    render(){
        return (
            <div>
                {this.renderData()}
            </div>
        );
    }
}


export default DeatiledTicketView;