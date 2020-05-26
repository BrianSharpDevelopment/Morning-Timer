import React from 'react';
import './today-card.css'

class TodayCared extends React.Component {

    render() {
        return <div className = "today-card__panel">
            <div className = "today-card__left-border"></div>
            <div className = "today-card__content">
                <div className = "today-card__title">
                    Today
                </div>
            </div>
        </div>
    }
}


export default TodayCared;