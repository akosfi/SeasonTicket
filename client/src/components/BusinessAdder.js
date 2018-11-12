import React from 'react';
import { Link, Redirect } from 'react-router-dom';


class BusinessAdder extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            email: "",
            redirect: false
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/businesses' />
        }
    }

    handleSubmit(e){
        let businessToSend = {
            name: this.state.name,
            email: this.state.email,
        }

        fetch("/api/businesses", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(businessToSend)
        })
        .then(res => res.text())
        .then(res => {
            console.log(res);
            this.setState({ redirect: true });
        })
        .catch(err=>{
            console.log("err: " + err)
        });

        e.preventDefault();
    }

    render(){
        return (
            <div>
                {this.renderRedirect()}

                <div className="jumbotron">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input className="form-control" type="text" name="name" onChange={e => this.setState({name: e.target.value})} value={this.state.name}/>
                        </div>
                        <div className="form-group">
                            <label>Contact email:</label>
                            <input className="form-control" type="text" name="email" onChange={e => this.setState({email: e.target.value})} value={this.state.email}/>
                        </div>
                        <input type="submit" value="Send" />
                    </form>
                </div>


                <Link to='/businesses'> -Back </Link>
            </div>
        );
    }

}


export default BusinessAdder;