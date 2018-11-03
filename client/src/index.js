import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './components/Home';
import TicketAdder from './components/TicketAdder';

import store from './store';

const render = () => {  
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>  
          <Route exact path="/" component={Home}/>
          <Route path="/tickets/add" component={TicketAdder} />
          
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