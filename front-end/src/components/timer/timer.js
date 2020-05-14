import React from 'react'
import './timer.css'
import {
    FaBell
} from 'react-icons/fa'

class Timer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            taskname: props.taskname || "",
            countdown: props.countdown || 0,
        }
    }

    secondsToObject() {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0,
        }
    }

    render() {


        return (
            <div className = "timer__panel">
                <div className = "timer__titlebar">
                    <div className = "timer__title">Timer</div>
                    <div className = "timer__alarm_switch">
                        <FaBell color = "#FDCB6E"/>Switch
                    </div> 
                </div>
                <h1 className = "timer__task_name">
                    Task - {this.state.taskname}
                </h1>
                <div className = "timer__countdown">
                    <div className = "timer__countdown_numbers">
                        <div className = "timer__countdown_hours">
                            <div className = "timer__countdown_count">00:</div>
                            <div>Hours</div>
                        </div>
                        
                        <div className = "timer__countdown_minutes">
                            <div className = "timer__countdown_count">00:</div>
                            <div>Min</div>            
                        </div>
                        
                        <div className = "timer__countdown_seconds">
                            <div className = "timer__countdown_count">00</div>
                            <div>Sec</div>
                        </div>
                    </div>
                </div>
                <div className = "timer__notes">
                    <div>Notes</div>
                    <textarea className = "timer__notes_ta" rows ="20" ></textarea>
                </div>
            </div>
        )
    }

}

export default Timer;

