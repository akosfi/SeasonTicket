import React, { Component } from 'react';
import TicketList from './TicketList';
import store from '../store';
import { addTicketsAction } from '../actions';
import Header from './Header';
import HeaderSolid from './HeaderSolid';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        intention: ""
    }
    this.chooseIntention = this.chooseIntention.bind(this);
  }

  chooseIntention(e){
    this.setState({
        intention: e.target.value
    }, () => {
        alert("Jelentkezz be a folytatáshoz!")
    });
  }



  componentWillMount(){
    fetch("/api/tickets")
    .then(response => response.json())
    .then(response => {
        store.dispatch(
            addTicketsAction(response)
        );
    });
  }
  
  renderWelcomeHeader(){
    if (!store.getState().user.id) {
      return <Header onButtonSelect={this.chooseIntention} />
    } else {
      return <HeaderSolid />
    }
  }

  renderBusinessJumbotron() {
    if (!store.getState().user.id) {
      return (<div class="container mb-5">
        <div class="inner-action">
          <div class="content-text">
            <h3 class="title">Indítsd be saját vállalkozásodat a Digitális Bérlettel! Kezdj bele most ...</h3>
            <div class="call-action-button">          
              <button onClick={this.chooseIntention} value="ticketsell" type="button" class="btn btn-fancy">Bérlet létrehozás</button>
            </div>
          </div>
        </div>
      </div>);
    }
  }

  renderHomePageContent(){
    if (this.state.intention == "ticketsell" && store.getState().user.id){
        return <Redirect to='/businesses/new' />
    }

    return <TicketList source={store.getState().tickets} type="ALL_TICKET_TO_BUY" buyable={store.getState().user.id != null}/>
  }

  render() {
    return (
      <div>  
        {this.renderWelcomeHeader()}
        {this.renderBusinessJumbotron()}
        {this.renderHomePageContent()}
        
      </div>            
    );
  }

}

export default Home;
