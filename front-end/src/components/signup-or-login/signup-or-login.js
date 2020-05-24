import React from 'react';
import './signup-or-login.css';
import { CSSTransition } from 'react-transition-group';

// import Cookie from 'js-cookie';
// const axios = require('axios');

class SignupForm extends React.Component {

    render() {
        return <form>
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "text" name = "firstName" placeholder = " "></input> 
                        <label className = "label" for = "firstName">First Name</label>
                    </div>
                </div>
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "text" name = "lastName" placeholder = " "></input>
                        <label className = "label" for = "lastName">Last Name</label>
                    </div>
                </div>
            </div>
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "email" name = "email" placeholder = " "></input> 
                        <label className = "label" for ="email">Email</label>
                    </div>
                </div>
            </div>
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "text" name = "password" placeholder = " "></input>
                        <label className = "label" for ="password">Password</label>
                    </div>
                </div>
            </div>            
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "text" name = "confirmPassword" placeholder = " "></input>
                        <label className = "label" for ="confirmPassword">Confirm Password</label>
                    </div>
                </div>
            </div>
            <div>
                <input type = "checkbox"></input>
                <span>I accept the <a href = "#">Term of Use</a> & <a href = "#">Privacy Policy</a>.</span>
            </div>
            <div className = "submitRow">
                <button>Sign Up</button>
            </div>
        </form>
    }

}

class LoginForm extends React.Component {
    

    render() {
        return <form>
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "email" name = "email" placeholder = " "></input> 
                        <label className = "label" for ="email">Email</label>
                    </div>
                </div>
            </div>
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "text" name = "password" placeholder = " "></input>
                        <label className = "label" for ="password">Password</label>
                    </div>
                </div>
            </div>            
            
            <div className = "submitRow">
                <button >Log In</button>

            </div>
        </form>
    }

}

class SignupOrLoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: this.props.isSignUp || "signUp"
        };
        
    }

    handleFormChange(targetForm) {
        
        let currentState = this.state;
        currentState['form'] = targetForm;
        this.setState(currentState);
    }


    // submitForm(event) {
    //     event.preventDefault();

    //     if(this.state.email && this.state.password) {
    //         axios.post("http://127.0.0.1:5050/user/login", this.state)
    //             .then(function(response) {
    //                 if(response.status === 200) {
    //                     Cookie.set("jwt-token", response.data.token)
    //                 }
    //             })
    //             .catch(function(response) {
    //                 console.log(response);
    //             });
    //     }
        
    // }

    render() {
        return <div className = "login__panel">
            <div className = "login__logo">
                Make <br />
                My <br />
                Morning <br />
            </div>
            <div className = "login__forms">
                <div className = "login__choose_form">
                    <button className = {this.state.form === "signUp" && "selected"} onClick = {this.handleFormChange.bind(this, "signUp")}>Sign Up</button>
                    <button className = {this.state.form === "logIn" && "selected"} onClick = {this.handleFormChange.bind(this, "logIn")}>Log In</button>
                </div>
                <div className = "login__form">
                    <CSSTransition in = {this.state.form === "signUp"} unmountOnExit timeout={200} classNames={"signup-form"}>
                        <SignupForm />
                    </CSSTransition>
                    <CSSTransition in = {this.state.form === "logIn"} unmountOnExit timeout={200} classNames={"login-form"}>                        
                        <LoginForm/>
                    </CSSTransition>
                </div>
                
            </div>
        </div>
    }
}

export default SignupOrLoginForm