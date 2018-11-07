import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './components/Home';
import TicketAdder from './components/TicketAdder';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';


import store from './store';
import UserTickets from './components/UserTickets';

const render = () => {  
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>  
          <NavigationBar />

          <Route exact path="/" component={Home}/>
          <Route exact path="/tickets" component={UserTickets} />
          <Route exact path="/tickets/add" component={TicketAdder} />  

          <Footer />
          <Link to="/tickets/add">Bérlet felvétel</Link>
        </div>        
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}
render();
//EZ NEM IGY FOG MUKODNI HANEM A PROVIDER BASZASSAL
store.subscribe(render);