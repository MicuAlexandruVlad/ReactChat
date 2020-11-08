import React, { Component } from 'react'
import './Conversation.scss'
import profilePlaceholder from '../../../assets/profile_placeholder.jpg'

export default class Conversation extends Component {
    render() {
        return (
            <div className="conversation-body flex-row">
                <div className="profile-holder">
                    <img src={ profilePlaceholder }/>
                </div>
                <div className="holder flex-col">
                    <div className="name-holder flex-row">
                        <span className="name">{this.props.conv.firstName} { this.props.conv.lastName }</span>
                        <span className="timestamp">{ this.props.conv.timestamp }</span> 
                    </div>
                    <span className="message">{ this.props.conv.lastMessage }</span>
                </div>
            </div>
        )
    }
}
