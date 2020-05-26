import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
// import Timer from './components/timer/timer';
import Home from './pages/home/home';
import SignupOrLoginForm from './components/signup-or-login/signup-or-login';
import Cookie from 'js-cookie';

function has_token() {
  let token = Cookie.get("jwt_token");
  return (!!token);
}

function clear_token() {
  Cookie.remove("jwt_token");
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = has_token();
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
        <Route 
          path = "/(signup)" 
          component={() => <SignupOrLoginForm form = "signUp" />}
        />
        <Route 
          path = "/(login)" 
          component={() => <SignupOrLoginForm form = "logIn" />}
        />
        <PrivateRoute path = "/(|home)" component={Home} />        
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

