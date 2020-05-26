import React from 'react'
import NavigationBar from './../../components/navigation-bar/navigation-bar';
import './home.css'

import CalendarCard from './../../components/cards/calendar-card/calendar-card';
import TodayCard from './../../components/cards/today-card/today-card'

class Home extends React.Component {

    render() {
        return <div>
            <NavigationBar />
            <main>
                <div id = "main-content">
                    <TodayCard/>
                    <CalendarCard />
                    <CalendarCard />
                </div>
            </main>
        </div>
    }
}

export default Home