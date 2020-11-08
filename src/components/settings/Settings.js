import React, { Component } from 'react'
import './Settings.scss'
import profilePlaceholder from '../../assets/profile_placeholder.jpg'
import addIcon from '../../assets/add.png'
import $ from 'jquery'
import Input from '../../shared/components/input/Input'
import Button from '../../shared/components/button/Button'
import { connect } from 'react-redux'

class Settings extends Component {

    state = {
        firstName: '',
        lastName: '',
        file: null
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.authUser.firstName,
            lastName: this.props.authUser.lastName
        })
    }

    onPhotoChange() {
        $("#fileInput").trigger('click')
        document.getElementById("fileInput").addEventListener("change", () => {
            const file = document.getElementById("fileInput").files[0]
            this.setState({
                file: file
            })
            console.log(file);
            $("#profileImg").attr("src", file)
        }, false)
    }

    handleChange = (value, id) => {
        switch (id) {
            case "firstName":
                this.setState({
                    firstName: value
                })
                break
            case "lastName":
                this.setState({
                    lastName: value
                })
                break
            default:
                break
        }
    }

    handleSave = () => {
        if (this.state.firstName === '' || this.state.lastName === '') {
            alert('One or more fields are empty')
        } else {
            // TODO: update user
        }
    }

    render() {
        return (
            <div className="settings-body flex-col">
                <h1>Profile Settings</h1>
                <div 
                    onClick={ () => this.onPhotoChange() }
                    className="photo-holder">
                    <img 
                        className="profile-img" 
                        src={ profilePlaceholder }
                        id="profileImg"/>
                    <input 
                        id="fileInput" 
                        type="file"
                        />
                    <div className="overlay">
                        <span>Change photo</span>
                    </div>
                </div>

                <div className="input-holder">
                    <Input  
                        placeholder="First Name"
                        type="text"
                        elementId="firstName"
                        value={ this.state.firstName }
                        onValueChange={ this.handleChange }
                    />
                    <Input  
                        placeholder="Last Name"
                        type="text"
                        elementId="lastName"
                        value={ this.state.lastName }
                        onValueChange={ this.handleChange }
                    />
                </div>

                <Button 
                    text="Save Changes"
                    centered={ true }
                    onClick= { this.handleSave }
                    />
            </div>
        )
    }
}

const mapState = appState => {
    return {
        authUser: appState.users
    }
}

export default connect(mapState)(Settings)