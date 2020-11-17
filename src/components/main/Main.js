import React, { Component } from 'react'
import './Main.scss'
import signOutIcon from '../../assets/logout.png'
import settingsIcon from '../../assets/settings.png'
import chatIcon from '../../assets/chat.png'
import exploreIcon from '../../assets/explore.png'
import { connect } from 'react-redux'
import { signOutUser } from '../../actions/authUser'
import { Switch, withRouter, Route } from 'react-router-dom'
import Conversations from '../conversations/Conversations'
import Settings from '../settings/Settings'
import Explore from '../explore/Explore'
import SignOutDialog from '../../shared/components/sign-out-dialog/SignOutDialog'
import Client from '../../utils/Client'
import { getUsers } from '../../actions/foundUsers'


class Main extends Component {

    state = {
        dialogOpen: false,
        chatActive: true,
        exploreActive: false,
        settingsActive: false,
    }

    componentDidMount() {
        // this.onChat()
        const client = new Client()

        client.getUsers().then(snapshot => {
            this.props.dispatch(getUsers(snapshot))
        })
    }

    onChat() {
        this.props.history.push("/main/conversations/chat")
        this.setState({
            chatActive: true,
            exploreActive: false,
            settingsActive: false,
        })
    }

    onExplore() {
        this.props.history.push("/main/explore")
        this.setState({
            chatActive: false,
            exploreActive: true,
            settingsActive: false,
        })
    }

    onSettings() {
        this.props.history.push("/main/settings")
        this.setState({
            chatActive: false,
            exploreActive: false,
            settingsActive: true,
        })
    }

    onSignOut() {
        this.setState({
            dialogOpen: true
        })
    }

    handleClose = (option) => {
        if (option === 1) {
            this.handleSignOut()
        }

        this.setState({
            dialogOpen: false
        })
    }

    handleSignOut() {
        this.props.dispatch(signOutUser())
        this.props.history.push("/login")
    }

    render() {
        return (
            <div className="main-body flex-col">
                <div className="messenger-container flex-row">
                    <div className="side-nav flex-col">
                        <div className="icons flex-col">
                            <div 
                                onClick={ () => this.onChat() }
                                className={ this.state.chatActive ? 
                                    "icon-holder flex-col icon-holder-active" : "icon-holder flex-col" }>
                                <img 
                                    src={ chatIcon } 
                                    className={ this.state.chatActive ? 
                                        "side-nav-icon icon-active" : "side-nav-icon" }/>
                            </div>
                            <div 
                                onClick={ () => this.onExplore() }
                                className={ this.state.exploreActive ? 
                                    "icon-holder flex-col icon-holder-active" : "icon-holder flex-col" }>
                                <img 
                                    src={ exploreIcon } 
                                    className={ this.state.exploreActive ? 
                                        "side-nav-icon icon-active" : "side-nav-icon" }/>
                            </div>
                            <div 
                                onClick={ () => this.onSettings() }
                                className={ this.state.settingsActive ? 
                                    "icon-holder flex-col icon-holder-active" : "icon-holder flex-col" }>
                                <img 
                                    src={ settingsIcon } 
                                    className={ this.state.settingsActive ? 
                                        "side-nav-icon icon-active" : "side-nav-icon" }/>
                            </div>
                            <div
                                onClick={ () => this.onSignOut() }
                                className="icon-holder flex-col">
                                <img src={ signOutIcon } className="side-nav-icon"/>
                            </div>
                        </div>
                    </div>

                    <Switch>
                        <Route render={ () => (
                            <Conversations />
                        )} path="/main/conversations" ></Route>
                        <Route render={ () => (
                            <Explore />
                        )} path="/main/explore"></Route>
                        <Route render={ () => (
                            <Settings />
                        )} path="/main/settings"></Route>
                    </Switch>

                </div>
                
                <SignOutDialog 
                    dialogOpen={ this.state.dialogOpen }
                    onClose={ this.handleClose }
                    />
                
            </div>
        )
    }
}

const mapState = appState => {
    return {
        authUser: appState.authUser
    }
}

export default withRouter(connect(mapState)(Main))
