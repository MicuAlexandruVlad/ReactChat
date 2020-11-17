import React, { Component } from 'react'
import './App.scss';
import { connect } from 'react-redux';
import { Link, Route, Redirect, withRouter, Switch } from 'react-router-dom';
import Login from '../login/Login'
import Register from '../register/Register'
import Main from '../main/Main'
import Client from '../../utils/Client'
import { authUser } from '../../actions/authUser';
import { newConversation } from '../../actions/conversations';
import { get } from 'jquery';
import { getMessages } from '../../actions/messages';

class App extends Component {

  componentDidMount() {
    
    const client = new Client()

    if (this.checkForAuthUser()) {
      const userId = localStorage.getItem('reactChatUserId')
      client.getUserById(userId).then((snapshot) => {
        this.props.dispatch(authUser(snapshot))
        this.getConversations()
        client.getSentMessages(userId).then(sentSnapshot => {
          client.getReceivedMessages(userId).then(receivedSnapshot => {
            this.props.dispatch(getMessages(sentSnapshot, receivedSnapshot))
            this.props.history.push("/main/conversations/chat/")
          })
        })
        // this.props.dispatch(getMessages(userId))
        // this.props.history.push("/main/conversations/chat/")

        client.listenForMessages(userId).onSnapshot(querySnapshot => {
          console.log('New message for me')
          querySnapshot.forEach(doc => {
            // console.log(doc.data())
          })
        })
      })
    }
  }

  getConversations() {
    let index = 0
    while (true) {
      const conv = localStorage.getItem(`chat_conv_${index}`)
      // console.log(conv)
      if (conv === undefined || conv === null) {
        break
      } else {
        index += 1
        this.props.dispatch(newConversation(JSON.parse(conv)))
      }
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
    conversations: appState.conversations
  }
}

export default withRouter(connect(mapState)(App));
