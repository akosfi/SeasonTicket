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

    render(){
        return <p>{JSON.stringify(this.state.response)}</p>
    }
}


export default DeatiledTicketView;