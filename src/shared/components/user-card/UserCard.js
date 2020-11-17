import React, { Component } from 'react'
import './UserCard.scss'
import profilePlaceholder from '../../../assets/profile_placeholder.jpg'
import messageIcon from '../../../assets/message.png'

export default class UserCard extends Component {
    render() {
        return (
            <div className="user-card-body flex-col">
                <div className="photo-holder">
                    <img src={ this.props.user.hasPhoto ? this.props.user.photoUrl : profilePlaceholder } />
                </div>
                <span className="name">{ this.props.user.firstName } { this.props.user.lastName }</span>
                <div 
                    className="message-btn flex-row"
                    onClick={ () => this.props.onMessage(this.props.user) }>
                    <img src={ messageIcon }/>
                    <span>Message</span>
                </div>
            </div>
        )
    }
}
