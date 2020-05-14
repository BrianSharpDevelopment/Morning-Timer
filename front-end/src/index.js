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
            
            <Route path = "/timer">
              <div className = "timer_display">
                <List />
                <Timer taskname = "Meditate"/>
              </div>
            </Route>

            <Route path = "/list">
              <div style = {{maxWidth: "800px"}}>
                <List />
              </div>
            </Route>
  
          </Switch>
        </main>
      </div>

    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// Pages