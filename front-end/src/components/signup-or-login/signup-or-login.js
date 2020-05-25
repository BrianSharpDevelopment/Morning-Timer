import React from 'react';
import './signup-or-login.css';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Cookie from 'js-cookie';

class VerifyCode extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            email: this.props.email || "",
            code: "",
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let currentState = this.state;
        currentState[event.target.name] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState(currentState);

        if (event.target.name === "confirmPassword") this.checkPasswordsMatch();
    }

    submitForm(event) {
        event.preventDefault();

        let valid = (!!this.state.email && !!this.state.code)

        if (valid) {
            let body = {
                "email": this.state.email,
                "code": this.state.code
            }

            axios({
                method: "POST",
                url: "http://127.0.0.1:5050/user/verify",
                data: body  
            }).then(function(response){
                console.log(response);
            }).catch(function (error){
                console.log(error);
            })
                
        }
    }

    render() {
        return <form onSubmit={this.submitForm.bind(this)}>
            <p>Thanks for signing up! We just need you to verify your email address to complete setting up your account. Please check your email for the verification code.</p>
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "email" name = "email" placeholder = " " value = {this.state.email} onChange = {this.handleChange} required></input> 
                        <label className = "label" for ="email">Email</label>
                    </div>
                </div>
            </div>
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "text" name = "code" placeholder = " " value = {this.state.code} onChange = {this.handleChange} required></input> 
                        <label className = "label" for = "code">Code</label>
                    </div>
                </div>
            </div>
            <div className = "submitRow">
                <button>Verify Account</button>
            </div>
        </form>
    }
}

class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptedTerms: false,
            warnPasswordsNotMatching: false,
            verifyCode: this.props.verifyCode || false
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.switchToVerifyCode.bind(this);
    }

    handleTextChange(event) {
        let currentState = this.state;
        currentState[event.target.name] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState(currentState);

        if (event.target.name === "confirmPassword") this.checkPasswordsMatch();
    }

    checkPasswordsMatch() {
        let currentState = this.state;
        currentState["warnPasswordsNotMatching"] = (this.state.confirmPassword.length > 0 && (this.state.password !== this.state.confirmPassword))
        this.setState(currentState)
    }

    switchToVerifyCode() {
        console.log("switching")
        let currentState = this.state;
        currentState["verifyCode"] = true;
        this.setState(currentState);
    }

    submitForm(event) {
        event.preventDefault();

        // Check if valid
        let valid = !!this.state.firstName;
        valid = valid && !!this.state.lastName;
        valid = valid && !!this.state.email;
        valid = valid && !!this.state.password;
        valid = valid && !!this.state.confirmPassword;
        valid = valid && (this.state.password === this.state.confirmPassword);
        valid = valid && this.state.acceptedTerms;

        let body = {
            "first_name": this.state.firstName,
            "last_name": this.state.lastName,
            "email": this.state.email,
            "password": this.state.password
        }

        if (valid) {
            let switchToVerifyCode = this.switchToVerifyCode()
            axios({
                method: "POST",
                url: "http://127.0.0.1:5050/user/register",
                data: body 
            }).then(function(response) {
                switchToVerifyCode()
            }).catch(function (error) {
                console.log(error)
            })
        }
    }

    render() {
        let warnPasswords = this.state.warnPasswordsNotMatching && <p className = "alert">Password doesn't match.</p>

        let targetForm = this.state.verifyCode ? <VerifyCode email = {this.state.email} /> : <form onSubmit={this.submitForm.bind(this)}>
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "text" name = "firstName" placeholder = " " value = {this.state.firstName} onChange = {this.handleTextChange} required></input> 
                        <label className = "label" for = "firstName" >First Name</label>
                    </div>
                </div>
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "text" name = "lastName" placeholder = " " value = {this.state.lastName} onChange = {this.handleTextChange} required></input>
                        <label className = "label" for = "lastName">Last Name</label>
                    </div>
                </div>
            </div>
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "email" name = "email" placeholder = " " value = {this.state.email} onChange = {this.handleTextChange} required></input> 
                        <label className = "label" for ="email">Email</label>
                    </div>
                </div>
            </div>
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "password" name = "password" placeholder = " " value = {this.state.password} onChange = {this.handleTextChange} required></input>
                        <label className = "label" for ="password">Password</label>
                    </div>
                </div>
            </div>            
            <div className = "row">
                <div className = "col">
                    <div className = "field">
                        <input className = "input" type = "password" name = "confirmPassword" placeholder = " " value = {this.state.confirmPassword} onChange = {this.handleTextChange} required></input>
                        <label className = "label" for ="confirmPassword" >Confirm Password</label>
                    </div>
                </div>
            </div>
            { warnPasswords }
            <div>
                <input type = "checkbox" name = "acceptedTerms" value = {this.state.acceptedTerms} onChange={this.handleTextChange}></input>
                <span>I accept the <a href = "#">Term of Use</a> & <a href = "#">Privacy Policy</a>.</span>
            </div>
            <div className = "submitRow">
                <button>Sign Up</button>
            </div>
        </form>

        return targetForm;
    }

}

class LoginForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            "email": "",
            "password": ""
        }
        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitForm(event) {
        event.preventDefault();
        let valid = !!this.state.email;
        valid = valid && !!this.state.password;

        if (valid) {
            let body = {
                "email": this.state.email,
                "password": this.state.password
            }

            axios({
                method: "POST",
                url: "http://127.0.0.1:5050/user/login",
                data: body
            }).then(function(response) {
                Cookie.set("jwt_token", response.data.token);
                console.log(response);
            }).catch(function(error){
                console.log(error);
            })
        }
    }

    handleChange(event) {
        let currentState = this.state;
        currentState[event.target.name] = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        this.setState(currentState);
    }

    render() {
        return <form onSubmit={this.submitForm}>
                <div className = "row">
                    <div className = "col">
                        <div className = "field">
                            <input className = "input" type = "email" name = "email" placeholder = " " value = {this.state.email} onChange={this.handleChange}></input> 
                            <label className = "label" for ="email">Email</label>
                        </div>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col">
                        <div className = "field">
                            <input className = "input" type = "text" name = "password" placeholder = " " value = {this.state.password} onChange={this.handleChange}></input>
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
            form: this.props.form || "signUp"
        };
        
    }

    handleFormChange(targetForm) {
        let currentState = this.state;
        currentState['form'] = targetForm;
        this.setState(currentState);
    }

    render() {
        return <div className = "signup_or_login__main" >
                
        <div className = "login__panel">
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
        </div>
    }
}

export default SignupOrLoginForm