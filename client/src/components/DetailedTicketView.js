import React from 'react';


class DeatiledTicketView extends React.Component{
    constructor(props){
        super(props);

    
        this.state = {
            response: null
        }
        this.renderOccasionByType = this.renderOccasionByType.bind(this);
        this.renderData = this.renderData.bind(this);
    }
    
    componentWillMount(){
        fetch("/api/transactions/" + this.props.match.params.id)
        .then(response => response.json())
        .then(response => {            
            this.setState({response});
        });
    }
    renderOccasionByType(){
        if(this.state.isOccasional){
            return (<div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">Hátralévő alkalmak száma:</span>
                        </div>
                        <div class="input-group-append">
                            <span class="input-group-text">{this.state.response.occasionNumber}</span>
                        </div>
                    </div>);
        }
        else{
            return (
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Felhasználható:</span>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text">{this.state.response.daysOfValidity} napon belül</span>
                    </div>
                </div>);
        }
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
                                <span class="input-group-text">Vásárlás dátuma:</span>
                            </div>
                            <div class="input-group-append">
                                <span class="input-group-text">{this.state.response.registrationDate}</span>
                            </div>
                        </div>


                        {this.renderOccasionByType()}
                        


                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Ár:</span>
                            </div>
                            <div class="input-group-append">
                                <span class="input-group-text">{this.state.response.price} Ft</span>
                            </div>
                        </div>

                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Vállalkozás neve:</span>
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