import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

/* Components Import */
import Home from './components/Home';
import TicketAdder from './components/TicketAdder';
import DetailedTicketView from './components/DetailedTicketView';
import Header from './components/Header';
import Footer from './components/Footer';
import UserBusinesses from './components/UserBusinesses';
import UserTickets from './components/UserTickets';
import BusinessAdder from './components/BusinessAdder';
import NavigationBar from './components/NavigationBar';

import store from './store';

const render = () => {  
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div>
          <NavigationBar />
          <Header />

          <Route exact path="/" component={Home}/>
          <Route exact path="/tickets" component={UserTickets} />
          <Route exact path="/tickets/add" component={TicketAdder} />  
          <Route exact path="/tickets/:id" component={DetailedTicketView} />
          <Route exact path="/businesses" component={UserBusinesses} />
          <Route exact path="/businesses/new" component={BusinessAdder} />

          <Footer />
        </div>        
      </Router>
    </Provider>,
    document.getElementById('root')
  )
}
render();
store.subscribe(render);