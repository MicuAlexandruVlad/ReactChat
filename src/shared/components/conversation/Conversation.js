import React, { Component } from 'react'
import './Conversation.scss'
import profilePlaceholder from '../../../assets/profile_placeholder.jpg'

export default class Conversation extends Component {

    convertUnix(unix) {

        var date = new Date(unix * 1000)

        var hours = date.getHours()
        var minutes = "0" + date.getMinutes()

        var formattedTime = hours + ':' + minutes.substr(-2)

        return formattedTime
    }

    render() {
        return(
            <div 
                className={ this.props.conv.active ? "conversation-body flex-row active" : "conversation-body flex-row" }
                onClick={ () => this.props.onConversation(this.props.conv) }>
                <div className="profile-holder">
                    <img src={ this.props.conv.photoUrl === '' ? profilePlaceholder : this.props.conv.photoUrl }/>
                </div>
                <div className="holder flex-col">
                    <div className="name-holder flex-row">
                        <span className="name">{this.props.conv.firstName} { this.props.conv.lastName }</span>
                        <span className="timestamp">{ this.convertUnix(parseInt(this.props.conv.timestamp)) }</span> 
                    </div>
                    <span className="message">{ this.props.conv.lastMessage }</span>
                </div>
            </div>
        )
    }
}
