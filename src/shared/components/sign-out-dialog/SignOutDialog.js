import React, { Component } from 'react'
import './SignOutDialog.scss'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default class SignOutDialog extends Component {

    state = {
        dialogOpen: false
    }

    render() {
        return (
            <div>
                <Dialog
                    open={ this.props.dialogOpen }
                    onClose={ () => this.props.onClose(0) }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    
                    <DialogTitle id="alert-dialog-title">Sign Out</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You are going to be disconnected from this account. Are you sure you want to continue ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ () => this.props.onClose(0) } color="primary">
                          No
                        </Button>
                        <Button onClick={ () => this.props.onClose(1) } color="primary">
                          Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
