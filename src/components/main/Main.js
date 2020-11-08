import React, { Component } from 'react'
import './Main.scss'
import signOutIcon from '../../assets/logout.png'
import settingsIcon from '../../assets/settings.png'
import chatIcon from '../../assets/chat.png'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { signOutUser } from '../../actions/authUser'
import { Switch, withRouter, Route } from 'react-router-dom'
import Conversations from '../conversations/Conversations'
import Settings from '../settings/Settings'


class Main extends Component {

    state = {
        dialogOpen: false,
    }

    componentDidMount() {
        // this.onChat()
    }

    onSignOut() {
        this.setState({
            dialogOpen: true
        })
    }

    onSettings() {
        this.props.history.push("/main/settings")
    }

    onChat() {
        this.props.history.push("/main/conversations/chat")
    }

    handleClose(option) {
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
                                className="icon-holder flex-col">
                                <img src={ chatIcon } className="side-nav-icon"/>
                            </div>
                            <div 
                                onClick={ () => this.onSettings() }
                                className="icon-holder flex-col">
                                <img src={ settingsIcon } className="side-nav-icon"/>
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
                            <Settings />
                        )} path="/main/settings"></Route>
                    </Switch>

                </div>
                <Dialog
                    open={ this.state.dialogOpen }
                    onClose={ () => this.handleClose(0) }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    
                    <DialogTitle id="alert-dialog-title">Sign Out</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You are going to be disconnected from this account. Are you sure you want to continue ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => this.handleClose(0) } color="primary">
                          No
                        </Button>
                        <Button onClick={ () => this.handleClose(1) } color="primary">
                          Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                
            </div>
        )
    }
}

export default withRouter(connect()(Main))
