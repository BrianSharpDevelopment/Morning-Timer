import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Timer from './components/timer/timer';
import SignupOrLoginForm from './components/signup-or-login/signup-or-login';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = false;
  return (
    <Route
      {...rest}
      render = { props => 
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to = {{ pathname: "/login", state: {from: props.location} }} />
        )        
      }
    />
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route path = "/login" component={SignupOrLoginForm} />
      <PrivateRoute path = "/(|home)" component={Timer} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

