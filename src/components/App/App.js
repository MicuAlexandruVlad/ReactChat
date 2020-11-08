import React, { Component } from 'react'
import './App.scss';
import { connect } from 'react-redux';
import { Link, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import Login from '../login/Login'
import Register from '../register/Register'
import Main from '../main/Main'
import Client from '../../utils/Client'
import { authUser } from '../../actions/authUser';

class App extends Component {

  componentDidMount() {
    
    const client = new Client()

    if (this.checkForAuthUser()) {
      client.getUserById(localStorage.getItem('reactChatUserId')).then((snapshot) => {
        this.props.dispatch(authUser(snapshot))
        this.props.history.push("/main/conversations/chat/")
      })
    }
  }

  checkForAuthUser() {
    if (localStorage.getItem('reactChatUserId') === undefined || localStorage.getItem('reactChatUserId') === null) {
      return false
    }
  
    return true
  }

  render() {
    return (
      <div className="app-body">
        <Switch>
          <Route render= { () => (
            <Register />
          )} path="/register"></Route>
          <Route render= { () => (
            <Login />
          )} path="/login" ></Route>
          <Route render= { () => (
            this.checkForAuthUser() ? <Main /> : <Redirect to="/login" />
          )} path="/main"></Route>
        </Switch>
      </div>
    )
  }
}

const mapState = appState => {
  return {

  }
}

export default withRouter(connect(mapState)(App));
