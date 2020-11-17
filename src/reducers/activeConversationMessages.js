import { NEW_ACTIVE_MESSAGE, GET_ACTIVE_MESSAGES } from '../actions/activeConversationMessages'

export default function activeConversationMessages(state = [], action) {
    switch (action.type) {
        case GET_ACTIVE_MESSAGES:
            
            return action.messages
        case NEW_ACTIVE_MESSAGE:
            
            return Object.assign([], state, state.concat([action.message]))
        default:
            return Object.assign([], state)
    }
}