import { AUTH_USER, REGISTER_USER, SIGN_OUT_USER, UPDATE_USER } from '../actions/authUser.js'
import Client from '../utils/Client'

const client = new Client()

export default function users(state = {}, action) {
    switch (action.type) {
        case AUTH_USER:
            const doc = action.snapshot.docs[0]

            let authState = Object.assign({}, state, {
                email: doc.data().email,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                hasPhoto: doc.data().hasPhoto,
                photoId: doc.data().photoId,
            })

            console.log("Great success authenticating the user")
            localStorage.setItem("reactChatUserId", doc.id)

            return authState

        case UPDATE_USER:
            let updateState = Object.assign({}, state, {
                firstName: action.user.firstName,
                lastName: action.user.lastName,
                hasPhoto: action.user.hasPhoto,
                photoId: action.user.photoId
            })   

            client.updateUser(updateState)

            return updateState

        case SIGN_OUT_USER:
            return Object.assign({}, state, {})

        case REGISTER_USER:
            client.init().collection("users").where("email", "==", action.user.email).get().then((snapshot) => {
                if (snapshot.size > 0) {
                    alert("User already exists")
                } else {
                    client.registerUser(action.user).then(() => {
                        console.log("Great success")
                        return Object.assign({}, state, {
                            email: action.user.email,
                            firstName: action.user.firstName,
                            lastName: action.user.lastName,
                            hasPhoto: action.user.hasPhoto,
                            photoId: action.user.photoId,
                        })
                    })
                }
            })

            break   

        default:
            return Object.assign({}, state)
    }
}