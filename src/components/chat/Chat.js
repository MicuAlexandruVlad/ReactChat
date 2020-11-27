import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Chat.scss'
import sendIcon from '../../assets/send.png'
import MessageSent from '../../shared/components/message-sent/MessageSent'
import MessageReceived from '../../shared/components/message-received/MessageReceived'
import $ from 'jquery'
import { newMessage, updateMessage } from '../../actions/messages'
import { newActiveMessage } from '../../actions/activeConversationMessages'
import { updateConversation } from '../../actions/conversations'
import Client from '../../utils/Client'

class Chat extends Component {

    state = {
        chatBoxValue: '',
        temporaryId: 0,
        chatBoxUpdate: false
    }

    componentDidMount() {
        this.updateScroll()

        $("#chat-box").on('focusin', () => {
            this.setState({
                chatBoxUpdate: true
            })
        })

        $("#chat-box").on('focusout', () => {
            this.setState({
                chatBoxUpdate: false
            })
        })

        $("#chat-box").on('keypress', (e) => {
            if (e.which === 13) {
                if (this.state.chatBoxValue !== '') {
                    let receiverId = ''
                    if (this.props.conv.user1Id === this.props.authUser.id) {
                        receiverId = this.props.conv.user2Id
                    } else {
                        receiverId = this.props.conv.user1Id
                    }   
                    const message = {
                        id: this.state.temporaryId,
                        convId: this.props.conv.id,
                        senderId: this.props.authUser.id,
                        receiverId: receiverId,
                        text: this.state.chatBoxValue,
                        timestamp: this.getTimestampUnix(),
                    }

                    this.props.dispatch(newMessage(message))
                    this.props.dispatch(newActiveMessage(message))
                    const updatedConv = this.props.conv
                    updatedConv.lastMessage = message.text
                    updatedConv.timestamp = message.timestamp
                    this.props.dispatch(updateConversation(updatedConv))

                    this.setState((state) => ({
                        chatBoxValue: '',
                        temporaryId: state.temporaryId++
                    }))

                    this.updateScroll()

                    const client = new Client()

                    client.uploadMessage(message).then((docRef) => {
                        this.props.dispatch(updateMessage(message.id, docRef.id))
                    })
                }
            }
        })
    }

    componentDidUpdate() {
        // TODO: get the messages for this conversation
        if (!this.state.chatBoxUpdate) {
            this.updateScroll()
        }
    }

    updateScroll() {
        var chatWindow = document.getElementById("chat-window");
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    handleChatBoxValueChange = (event) => {
        this.setState({
            chatBoxValue: event.target.value,
            lastChange: 2
        })
    }

    getTimestampUnix() {
        return new Date().getTime() / 1000
    }


    render() {
        return (
            <div className="chat-body flex-col">
                <div className={ this.props.conv.id === undefined ? "main-chat-body hidden flex-col" : "main-chat-body flex-col" }>
                    <div className="chat-top flex-row">
                        <img 
                            src={ this.props.conv === undefined ? '' : this.props.conv.photoUrl }
                            className="chat-top-photo"/>
                        <span className="chat-top-name">{ 
                            this.props.conv === undefined ? '' : `${this.props.conv.firstName} ${this.props.conv.lastName}`
                        }</span>
                    </div>
                    <div className="sep"></div>
                    <div 
                        id="chat-window"
                        className="chat-window">
                        {
                            this.props.activeConversationMessages.map((m) => {
                                if (m.senderId === this.props.authUser.id) {
                                    return <MessageSent key={ m.id } message={ m } />
                                } else {
                                    return <MessageReceived key={ m.id } message={ m } />
                                }
                            })
                        }
                    </div>
                    <div className="chat-bottom flex-row">
                        <input 
                            onChange={ (event) => this.handleChatBoxValueChange(event) }
                            id="chat-box"
                            value={ this.state.chatBoxValue }
                            placeholder="Type your message here"
                            spellCheck="false"
                            autoComplete="off"
                            type="text"/>
                        <img src={ sendIcon } />
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = appState => {
    return {
        conv: appState.activeConversation,
        authUser: appState.authUser,
        activeConversationMessages: appState.activeConversationMessages,
    }
}

export default connect(mapState)(Chat)
