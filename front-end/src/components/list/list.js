import React from 'react'
import './list.css'
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank
} from 'react-icons/md'
import {
    GoTriangleRight
} from 'react-icons/go'

function ListItem(props) {
    return <div className = "list_item__panel">
        <div className = "list_item__current_timer" >
            {
                props.current && <GoTriangleRight color = "#00B894" size = {26} />
            }
        </div>
        <div className = "list_item__checkbox">
            { 
                !props.checked ? 
                    <MdCheckBoxOutlineBlank color = "#FDCB6E" size = {26} onClick = {props.onClickCheckMark}/> : 
                    <MdCheckBox color = "#FDCB6E" size = {26} onClick = {props.onClickCheckMark}/> }
        </div>
        <div className = "list_item__name">
            {props.name || ""}
        </div>
        <div className = "list_item__time">
            {(props.time || 0) + " Min"}
        </div>
    </div>
}

class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            list_items: [
                {list_name: "Do Something1", list_time_min: 5, complete: true},
                {list_name: "Do Something2", list_time_min: 5, complete: false},
                {list_name: "Do Something3", list_time_min: 5, complete: false},
            ],
            current: 1
        }
    }

    onChangeChecked(index) {
        if(index == this.state.current) {   
            let new_state = this.state;
            new_state.list_items[index].complete = !new_state.list_items[index].complete
            new_state.current = new_state.current + 1
            this.setState(new_state)
        }
    }

    render() {

        let items  = this.state.list_items.map(function (list_item, idx) {
            return <ListItem 
                        key = {"list_item__" + idx}
                        name = {list_item.list_name} 
                        time={list_item.list_time_min} 
                        checked = {list_item.complete || false} 
                        onClickCheckMark = {this.onChangeChecked.bind(this, idx)} 
                        current = {idx === this.state.current}/>
        }, this)
    
        return (
            <div className = "list__panel">
                <div className = "list__header">
                    <h2 className = "list__day_name">Today</h2>
                    <div className = "list__header_toolbar">
                        <div className = "list__header_date">
                            Monday, April 20
                        </div>
                        <div className = "list__header_actions">
                            <button className = "list__edit_btn">Edit</button>
                            <button className = "list__play_btn"><GoTriangleRight color = "#fff" size = {14} />Play</button>
                        </div>

                    </div>
                </div>
                <div className = "list__items">
                    {items}
                </div>
            </div>
        
        )
    }
}

export default List;

