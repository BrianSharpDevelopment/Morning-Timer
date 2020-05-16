import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import NavigationBar from './components/navigation-bar/navigation-bar';
import List from './components/list/list';
import Timer from './components/timer/timer';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <div className = "layout_with_navigation">
        <NavigationBar />
        <main>
          <Switch>
            
            {Home()}
            {Today()}
            {Tomorrow()}
            {Calendar()}
            {Tips()}
            {Profile()}
  
          </Switch>
        </main>
      </div>

    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// Pages
function Home() {
  return <Route path = "/home">
    <div>
      <h3>Home</h3>
    </div>
  </Route>
}


function Today() {
  return <Route path = "/today">
    <div className = "timer_display">
        <List />
        <Timer taskname = "Meditate"/>
      </div>
  </Route>
}

function Tomorrow() {
  return <Route path = "/tomorrow">
    <div className = "timer_display">
      <List />
      <Timer taskname = "Meditate"/>
    </div>
  </Route>
}

function Calendar() {
  return <Route path = "/calendar">
    <div>
      <h3>Calendar</h3>
    </div>
  </Route>
}

function Tips() {
  return <Route path = "/tips">
    <div>
      <h3>Tips</h3>
    </div>
  </Route>
}

function Profile() {
  return <Route path = "/profile">
    <div>
      <h3>Profile</h3>
    </div>
  </Route>
}
