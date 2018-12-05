import React from 'react';
import { Link } from 'react-router-dom';

class TicketItemUser extends React.Component{
    constructor(props) {
        super(props);

       
    }



    renderByTicketType(item){
        if(item.isOccasional){
            return <p>{item.occasionNumber} alkalmas</p>
        }
        return <p>{item.daysOfValidity} napos</p>
    }

    renderPrice(){
        if(this.props.item.price != undefined){
            return <h6 class="card-subtitle mb-2 text-muted">{this.props.item.price} Ft</h6>
        }
    }
    
    render(){
        return(
            <div class="col-3 item">
                <div class="card">
                    <img class="card-img-top" src={"https://picsum.photos/420/210?image=" + this.props.item.id} alt="Card cap"/>
                    <div class="card-body">
                        <h5 class="card-title">{this.props.item.name}</h5>
                        {this.renderPrice()}
                        {this.renderByTicketType(this.props.item)}
                        <Link to={"/tickets/" + this.props.item.id}>Részletek</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default TicketItemUser;
                        