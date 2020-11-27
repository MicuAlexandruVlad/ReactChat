import { NEW_MESSAGE, GET_MESSAGES, UPDATE_MESSAGE } from '../actions/messages'
import Client from '../utils/Client'

const client = new Client()

export default function m(state = [], action) {
    switch (action.type) {
        case NEW_MESSAGE:
            
            return Object.assign([], state, state.concat([action.message]))

        case GET_MESSAGES: 
            let m = []
            action.sentSnapshot.forEach((doc) => {
                const message = {
                    id: doc.id,
                    senderId: doc.data().senderId,
                    receiverId: doc.data().receiverId,
                    text: doc.data().text,
                    timestamp: doc.data().timestamp
                }
                
                // console.log(message)
                m.push(message)
            })

            action.receivedSnapshot.forEach(doc => {
                const message = {
                    id: doc.id,
                    senderId: doc.data().senderId,
                    receiverId: doc.data().receiverId,
                    text: doc.data().text,
                    timestamp: doc.data().timestamp
                }
                // console.log(message)
                m.push(message)
            })

            for (let i = 0; i < m.length; i++) {
                var message1 = m[i];
                for (let j = 0; j < m.length; j++) {
                    var message2 = m[j];
                    
                    if (message1.timestamp > message2.timestamp) {
                        var aux = m[i]
                        m[i] = m[j]
                        m[j] = aux
                    }
                }
            }

            m.reverse()

            return Object.assign([], state, state.concat(m))
            
        case UPDATE_MESSAGE: 
            
            let updatedState = state.map((message) => {
                if (message.id === action.messageId) {
                    message.id = action.newId
                }

                return message
            })

            return updatedState
        default:
            return Object.assign([], state)
    }
}