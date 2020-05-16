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
                <li><Link to="/today">Today</Link></li>
                <li><Link to="/tomorrow">Tomorrow</Link></li>
                <li><Link to="/calendar">Calendar</Link></li>
                <li><Link to="/tips">Tips</Link></li>
                <li>
                    <Link to="/profile">
                        Setting
                    </Link>
                </li>
            </ul>
        </nav>
    }
}

export default NavigationBar