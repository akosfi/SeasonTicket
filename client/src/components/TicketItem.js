import React from 'react';

class TicketItem extends React.Component{
    constructor(props){
        super(props);

    }
    

    render(){
        return(
            <div>
                Price: {this.props.item.price}
                daysOfValidity: {this.props.item.price.daysOfValidity}
                occasionNumber: {this.props.item.price.occasionNumber}
                isActive: {this.props.item.price.isActive ? "true" : "false"}
            </div>
        );
    }
}

export default TicketItem;
                        