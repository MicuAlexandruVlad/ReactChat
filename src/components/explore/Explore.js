import React, { Component } from 'react'
import './Explore.scss'
import UserCard from '../../shared/components/user-card/UserCard'
import { getUsers } from '../../actions/foundUsers'
import { connect } from 'react-redux'
import Client from '../../utils/Client'
import { newConversation } from '../../actions/conversations'
import { withRouter } from 'react-router-dom'
import conversations from '../../reducers/conversations'

class Explore extends Component {

    handleNewMessage = (user) => {
        const conversation = {
            id: this.props.conversations.length,
            user1Id: this.props.authUser.id,
            user2Id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            lastMessage: '',
            timestamp: Math.round((new Date()).getTime() / 1000),
            photoUrl: user.photoUrl,
            active: false
        }

        this.props.dispatch(newConversation(conversation))
        this.props.history.push('/main/conversations/chat')
    }

    render() {
        return (
            <div className="explore-body flex-col">
                <h1>Explore</h1>
                <div className="user-holder flex-row">
                    {
                        this.props.foundUsers.map((user) => {
                            if (user.id !== this.props.authUser.id) {
                                return <UserCard 
                                            key={ user.id }
                                            user={ user }
                                            onMessage={ this.handleNewMessage } />
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapState = appState => {
    return {
        foundUsers: appState.foundUsers,
        authUser: appState.authUser,
        conversations: appState.conversations,
    }
}

export default withRouter(connect(mapState)(Explore))