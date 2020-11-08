import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './Conversations.scss'
import Chat from '../chat/Chat'
import searchIcon from '../../assets/search.png'
import Conversation from '../../shared/components/conversation/Conversation'

export default class Conversations extends Component {

    state = {
        filterValue: '',
    }

    mockData() {
        const conv1 = {
            id: 1,
            firstName: "Daniel",
            lastName: "Evans",
            lastMessage: "Hey dude how's life ?",
            timestamp: "14:53"
        }

        const conv2 = {
            id: 2,
            firstName: "John",
            lastName: "Hawk",
            lastMessage: "Got the book. Thanks",
            timestamp: "12:21"
        }

        const conv3 = {
            id: 3,
            firstName: "Ema",
            lastName: "Daner",
            lastMessage: "I like that",
            timestamp: "16:22"
        }

        const conv4 = {
            id: 4,
            firstName: "Jessica",
            lastName: "Flint",
            lastMessage: "Sure. We'll talk later.",
            timestamp: "20:44"
        }

        const conversations = []
        conversations.push(conv1)
        conversations.push(conv2)
        conversations.push(conv3)
        conversations.push(conv4)

        return conversations
    }

    onFilterChange = (event) => {
        this.setState({
            filterValue: event.target.value
        })
    }

    render() {
        return (
            <div className="flex-row main-conv-body">
                <div className="conversations-body flex-col">
                    <div className="search-bar-holder flex-col">
                        <div className="search-bar flex-row">
                            <img src={ searchIcon }/>
                            <input 
                                value={ this.state.filterValue } 
                                type="text" 
                                placeholder="Type something" 
                                spellCheck="false"
                                onChange={ this.onFilterChange }
                                />
                        </div>
                    </div>
                    <div className="separator"></div>
                    <div className="conversation-list-holder">
                        { this.mockData().map((conv) => {
                            const fullName = conv.firstName + " " + conv.lastMessage
                            if (fullName.includes(this.state.filterValue)) {
                                return <Conversation key={ conv.id } conv={ conv } />
                            }

                        }) }
                    </div>
                </div>

                <Switch>
                    <Route render={() => (
                        <Chat />
                    )} path="/main/conversations/chat" ></Route>
                </Switch>
            </div>
        )
    }
}
