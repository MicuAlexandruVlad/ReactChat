import React, { Component } from 'react'
import './Login.scss'
import logo from '../../assets/logo.png'
import Input from '../../shared/components/input/Input'
import Button from '../../shared/components/button/Button'
import { withRouter } from 'react-router-dom'
import { authUser } from '../../actions/authUser'
import { connect } from 'react-redux'
import Client from '../../utils/Client'

class Login extends Component {

    state = {
        email: "",
        password: ""
    }

    handleLogin = () => {
        if (this.state.email === "" || this.state.password === "") {
            console.log("One or more fields are empty")
        } else {
            const client = new Client()
            const user = {
                email: this.state.email,
                password: this.state.password,
            }

            client.getUser(user).then((snapshot) => {
                if (snapshot.size === 1) {
                    this.props.dispatch(authUser(snapshot))
                    this.props.history.push("/main")
                } else if (snapshot.size === 0) {
                    alert("User does not exist")
                }
            })
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
            default:
                break
        }
    }

    navRegister() {
        this.props.history.push("/register")
    }   

    render() {
        return (
            <div className="login-body flex-col">
                <div className="flex-col container">
                    <div className="flex-row top">
                        <img src={ logo } className="logo"/>
                        <h2>Login</h2>
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
                    <span
                        onClick={ () => this.navRegister() } 
                        className="sign-up">Sign Up</span>
                    <Button
                        text="Login"
                        centered={ true }
                        onClick= { this.handleLogin } />
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(Login))
