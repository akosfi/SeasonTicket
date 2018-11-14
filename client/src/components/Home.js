import React, { Component } from 'react';
import TicketList from './TicketList';
import store from '../store';
import { addTicketsAction } from '../actions';


class Home extends Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div>
        
        <article class="container" onLoad="buildCarousels()">
          <div class="row">
            <div class="pt-3 pb-3 owl-carousel owl-theme">
              <div class="col item">
                <div class="card">
                  <img class="card-img-top" src="https://picsum.photos/420/210?image=436" alt="Card image cap"/>
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                  </div>
                </div>
              </div>
              <div class="col item">
                <div class="card">
                  <img class="card-img-top" src="https://picsum.photos/420/210?image=54" alt="Card image cap"/>
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                  </div>
                </div>
              </div>
              <div class="col item">
                <div class="card">
                  <img class="card-img-top" src="https://picsum.photos/420/210?image=273" alt="Card image cap"/>
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        
        <TicketList source={store.getState().tickets} type="ALL_TICKET_TO_BUY" buyable={store.getState().user.id != null}/>
        <TicketList source={store.getState().tickets} type="ALL_TICKET_TO_BUY" buyable={store.getState().user.id != null}/>
        <TicketList source={store.getState().tickets} type="ALL_TICKET_TO_BUY" buyable={store.getState().user.id != null}/>

      </div>      
    );
  }

}

export default Home;
