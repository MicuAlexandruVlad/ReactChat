import React, { Component } from 'react'
import './Settings.scss'
import profilePlaceholder from '../../assets/profile_placeholder.jpg'
import addIcon from '../../assets/add.png'
import $ from 'jquery'
import Input from '../../shared/components/input/Input'
import Button from '../../shared/components/button/Button'
import { connect } from 'react-redux'
import Client from '../../utils/Client'
import { updateUser } from '../../actions/authUser'

class Settings extends Component {

    state = {
        firstName: '',
        lastName: '',
        initialFirstName: '',
        initialLastName: '',
        file: null
    }

    componentDidMount() {
        this.setState({
            firstName: this.props.authUser.firstName,
            lastName: this.props.authUser.lastName,
            initialFirstName: this.props.authUser.firstName,
            initialLastName: this.props.authUser.lastName,
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
        } else if (this.state.firstName !== this.state.initialFirstName || 
                this.state.lastName !== this.state.initialLastName || this.state.file !== null){
            // TODO: update user
            const client = new Client()

            if (this.state.file !== null) {
                var uploadTask = client.uploadPhoto(this.state.file, this.props.authUser.id)
                
                uploadTask.on('state-changed', null, null, () => {
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                        console.log('Image uploaded; download url: ', downloadUrl)
                        const user = {
                            id: this.props.authUser.id,
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            hasPhoto: true,
                            photoUrl: downloadUrl
                        }
                        client.updateUser()
                        this.props.dispatch(updateUser(user))
                    })
                })
            } else if (this.state.firstName !== this.state.initialFirstName || 
                this.state.lastName !== this.state.initialLastName) {
                    const user = {
                        id: this.props.authUser.id,
                        firstName: this.state.firstName,
                        lastName: this.state.lastName,
                        hasPhoto: this.props.authUser.hasPhoto,
                        photoUrl: this.props.authUser.photoUrl
                    }
                    client.updateUser(user)
                    this.props.dispatch(updateUser(user))
            }
        }
    }

    render() {
        return (
            <div className="settings-body flex-col">
                <h1>Edit Profile</h1>
                <div 
                    onClick={ () => this.onPhotoChange() }
                    className="photo-holder">
                    <img 
                        className="profile-img" 
                        src={ this.props.authUser.hasPhoto ? this.props.authUser.photoUrl : profilePlaceholder }
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
        authUser: appState.authUser
    }
}

export default connect(mapState)(Settings)