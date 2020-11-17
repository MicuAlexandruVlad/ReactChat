import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import './Conversations.scss'
import Chat from '../chat/Chat'
import searchIcon from '../../assets/search.png'
import deleteIcon from '../../assets/delete.png'
import Conversation from '../../shared/components/conversation/Conversation'
import { connect } from 'react-redux'
import { setActive } from '../../actions/activeConversation'
import { getActiveMessages } from '../../actions/activeConversationMessages'

class Conversations extends Component {

    state = {
        filterValue: '',
    }

    onFilterChange = (event) => {
        this.setState({
            filterValue: event.target.value
        })
    }

    onClearFilter() {
        this.setState({
            filterValue: ''
        })
    }

    handleConversationClick = (conv) => {
        this.props.dispatch(setActive(conv))
        const activeMessages = []
        const u1Id = conv.user1Id
        const u2Id = conv.user2Id
        this.props.messages.forEach((m) => {
            if (m.senderId === u1Id || m.senderId === u2Id) {
                if (m.receiverId === u1Id || m.receiverId === u2Id) {
                    activeMessages.push(m)
                }
            }
        })

        this.props.dispatch(getActiveMessages(activeMessages))
    }

    render() {
        return (
            <div className="flex-row main-conv-body">
                <div className="conversations-body flex-col">
                    <div className="search-bar-holder flex-col">
                        <div className="search-bar flex-row">
                            <img className="search" src={ searchIcon }/>
                            <input 
                                value={ this.state.filterValue } 
                                type="text" 
                                placeholder="Type something" 
                                spellCheck="false"
                                onChange={ this.onFilterChange }
                                />
                            <img 
                                src={ deleteIcon } 
                                className="delete"
                                onClick={ () => this.onClearFilter() }
                                />
                        </div>
                    </div>
                    <div className="separator"></div>
                    <div className="conversation-list-holder">
                        { this.props.conversations.map((conv) => {
                            const fullName = conv.firstName + " " + conv.lastName
                            if (fullName.toLowerCase().includes(this.state.filterValue.toLowerCase())) {
                                return <Conversation 
                                            key={ conv.id } 
                                            conv={ conv }
                                            onConversation={ this.handleConversationClick } />
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


const mapState = appState => {
    return {
        conversations: appState.conversations,
        messages: appState.messages,
    }
}

export default connect(mapState)(Conversations)