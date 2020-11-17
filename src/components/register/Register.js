import React, { Component } from 'react'
import './Register.scss'
import logo from '../../assets/logo.png'
import Input from '../../shared/components/input/Input'
import Button from '../../shared/components/button/Button'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/users'
import Client from '../../utils/Client'

class Register extends Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    }

    handleRegister = () => {
        if (this.state.email === '' 
            || this.state.password === '' 
            || this.state.firstName === '' 
            || this.state.lastName === '') {
            console.log('One or more fields are empty')
        } else {
            const user = {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                hasPhoto: false,
                photoUrl: ''
            }


            this.props.dispatch(registerUser(user))
        }
    }

    handleChange = (value, id) => {
        switch (id) {
            case "email":
                this.setState({
                    email: value
                })
                break
            case "password":
                this.setState({
                    password: value
                })
                break
            case "firstName":
                this.setState({
                    firstName: value
                })
                break
            case "lastName":
                this.setState({
                    lastName: value
                })
                break
            default:
                break
        }
    }

    navLogin() {
        this.props.history.push('./login')
    }
    
    render() {
        return (
            <div className="register-body flex-col">
                <div className="flex-col container">
                    <div className="flex-row top">
                        <img src={ logo } className="logo"/>
                        <h2>Sign Up</h2>
                    </div>
                    <Input 
                        placeholder="Email"
                        type="email"
                        elementId="email"
                        value={ this.state.email }
                        onValueChange={ this.handleChange } />
                    <Input 
                        placeholder="Password"
                        type="password"
                        elementId="password"
                        value={ this.state.password }
                        onValueChange={ this.handleChange } />
                    <Input 
                        placeholder="First Name"
                        type="text"
                        elementId="firstName"
                        value={ this.state.firstName }
                        onValueChange={ this.handleChange } />
                    <Input 
                        placeholder="Last Name"
                        type="text"
                        elementId="lastName"
                        value={ this.state.lastName }
                        onValueChange={ this.handleChange } />
                    <span
                        onClick={ () => this.navLogin() } 
                        className="login">Login</span>
                    <Button
                        text="Sign Up"
                        centered={ true }
                        onClick= { this.handleRegister } />
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(Register))