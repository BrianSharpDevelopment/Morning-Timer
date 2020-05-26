import React from 'react'
import './navigation-bar.css'
import {
    Link
} from "react-router-dom";
  

class NavigationBar extends React.Component {


    render() {
        return <nav>
            <div className = "navigation-bar__title">Make My Morning</div>
            <hr/>
            <ul>
                <li className = "navigation-bar__home_link"><Link to="/home">Home</Link></li>
                <hr />
                <li className = "navigation-bar__today_link"><Link to="/today">Today</Link></li>
                <li className = "navigation-bar__tomorrow_link"><Link to="/tomorrow">Tomorrow</Link></li>
                <li className = "navigation-bar__calendar_link"><Link to="/calendar">Calendar</Link></li>
                <li className = "navigation-bar__user-setting-link">
                    <div className = "navigation-bar__user_image"></div>
                    <Link to="/profile">
                        Setting
                    </Link>
                </li>
            </ul>
        </nav>
    }
}

export default NavigationBar