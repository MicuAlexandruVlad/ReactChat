import { GET_USERS } from '../actions/foundUsers'
import Client from '../utils/Client'

const client = new Client()

export default function foundUsers(state = [], action) {
    switch (action.type) {
        case GET_USERS:
            
            const users = []
                action.snapshot.forEach(doc => {
                    const user = {
                        id: doc.id,
                        firstName: doc.data().firstName,
                        lastName: doc.data().lastName,
                        hasPhoto: doc.data().hasPhoto,
                        photoUrl: doc.data().photoUrl
                    }

                    users.push(user)
                })

            return Object.assign([], state, state.concat(users))
        default:
            return Object.assign([], state)
    }
}