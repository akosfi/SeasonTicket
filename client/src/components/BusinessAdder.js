import React from 'react';
import HeaderSolid from './HeaderSolid';
import { Link, Redirect } from 'react-router-dom';


class BusinessAdder extends React.Component{
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            name: "",
            email: "",
            redirect: false,
            errors: []
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/businesses' />
        }
    }

    validateInput(){
        let errors = [];
        if(this.state.name == "")
            errors.push("Név mező nem lehet üres!");
        if(this.state.email == "")
            errors.push("Email mező nem lehet üres!");
        
        this.setState({
            errors: errors
        });

        if(errors.length > 0) return true;
        return false;
    }

    handleSubmit(e){
        e.preventDefault();
        if(this.validateInput())
            return true;

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

    }

    render(){
        return (
            <div>
                <HeaderSolid />
                <div class="container">
                    {this.renderRedirect()}

                    <div className="jumbotron">
                        <ul>
                            {this.state.errors.map(e => {
                                return <li>{e}</li>
                            })}
                        </ul>
                        <form onSubmit={this.handleSubmit}>
                            <h1>Bérlet kibocsátáshoz fel kell vennie vállalkozása email címét és nevét a rendszerünkben!</h1>
                            <p>Ezt itt teheti meg:</p>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Vállalkozás neve:</span>
                                </div>
                                <input class="form-control" type="text" placeholder="Vállalkozás neve" name="name" onChange={e => this.setState({name: e.target.value})} value={this.state.name}/>
                            </div>

                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">Email-cím:</span>
                                </div>
                                <input class="form-control" placeholder="Email-cím" type="text" name="email" onChange={e => this.setState({email: e.target.value})} value={this.state.email}/>
                            </div>

                            <input class="btn btn-primary" type="submit" value="Mentés" />
                            <Link className="btn btn-secondary ml-3" to='/businesses'>Vissza</Link>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}


export default BusinessAdder;