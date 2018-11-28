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
                <div class="card">
                    <img class="card-img-top" src={"https://picsum.photos/420/210?image=" + this.state.response.id} alt="Card cap" />
                    <div class="card-cat-overlay">
                        <span class="badge badge-primary">{this.state.response.category}</span>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{this.state.response.name}</h5>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Registraion Date:</span>
                            </div>
                            <div class="input-group-append">
                                <span class="input-group-text">{this.state.response.registrationDate}</span>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Occasion Number:</span>
                            </div>
                            <div class="input-group-append">
                                <span class="input-group-text">{this.state.response.occasionNumber}</span>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Days of Validity:</span>
                            </div>
                            <div class="input-group-append">
                                <span class="input-group-text">{this.state.response.daysOfValidity}</span>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Is Occasional:</span>
                            </div>
                            <div class="input-group-append">
                                <span class="input-group-text">{this.state.response.isOccasional}</span>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Price:</span>
                            </div>
                            <div class="input-group-append">
                                <span class="input-group-text">{this.state.response.price} Ft</span>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Business Name:</span>
                            </div>
                            <div class="input-group-append">
                                <span class="input-group-text">{this.state.response.businessName}</span>
                            </div>
                        </div>
                        
                        <img class="rounded mx-auto d-block" width="200px" src={this.state.response.qrURL}/>
                    </div>
                </div>
            );
        }       
    }

    render(){
        return (
            <div class="container">
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-8">
                        {this.renderData()}
                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </div>
        );
    }
}


export default DeatiledTicketView;