import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import List from './components/list/list';
import Timer from './components/timer/timer';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
      <div style = {{maxWidth: "800px"}}>
        <Timer taskname = "Medicare"/>
        {/* <List /> */}
      </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
