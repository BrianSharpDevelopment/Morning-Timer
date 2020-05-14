import React from 'react'
import './navigation-bar.css'
import {
    Link
} from "react-router-dom";
  

class NavigationBar extends React.Component {


    render() {
        return <nav>
            <h3>Make My Morning</h3>
            <hr />
            <li><Link to="/home">Home</Link></li>
            <hr />
            <ul>
                <li><Link to="/timer">Today</Link></li>
                <li><Link to="/list">Tomorrow</Link></li>
                <li><Link to="/list">Calendar</Link></li>
            </ul>
        </nav>
    }
}

export default NavigationBar