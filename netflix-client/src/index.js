import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignUp from "./Components/SignUp";
import LogIn from './Components/LogIn';
import Index from './Components/Index';
import MovieDetails from './Components/MovieDetails';
import movieScoreBoard from './Components/MovieScoreBoard'
import SubscriptionPaymentPage from './Components/SubscriptionPaymentPage'

import AdminDashboard from './Components/AdminDashboard';

ReactDOM.render(
    <Router>
      <div>
        <Route exact path="/adminDashboard" component={AdminDashboard} />
        <Route exact path="/" component={Index} />
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/movieDetails/:movieId" component={MovieDetails} />
        <Route exact path="/movieScoreBoard" component={movieScoreBoard} />
	<Route exact path="/movieDetails/" component={MovieDetails} />
        <Route exact path="/payment" component={SubscriptionPaymentPage} />
 
        {/* <Route exact path="/tickets" component={TicketBooking} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/confirmation" component={TicketConfirmation} />
        <Route exact path="/orders" component={PurchaseHistory} /> */}
      </div>
    </Router>,
  document.getElementById('root')
);

