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
                    <p>Name: {this.state.response.name}</p>
                    <p>Registraion Date: {this.state.response.registrationDate}</p>
                    <p>Occasion Number: {this.state.response.occasionNumber}</p>
                    <p>Days of Validity: {this.state.response.daysOfValidity}</p>
                    <p>Is Occasional?: {this.state.response.isOccasional}</p>
                    <p>Price: {this.state.response.price}</p>
                    <p>Business Name: {this.state.response.businessName}</p>
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