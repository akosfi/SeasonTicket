import React from 'react';

class TicketList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            apiResult: []
        }
    }
    componentDidMount(){
        fetch("https://localhost:44306/api/tickets")
        .then(response => response.json())
        .then(response => {
            console.log(response);
            this.setState({
                apiResult: response
            });
        });
    }

    render(){
        return (<div>
            <ul>
                {this.state.apiResult.map(ticket => {
                    return <li key={`${ticket.id}`}>{ticket.price}</li>
                })}
            </ul>
        </div>)
    }
}

export default TicketList;