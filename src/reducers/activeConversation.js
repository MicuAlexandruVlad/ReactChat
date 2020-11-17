import { SET_ACTIVE } from '../actions/activeConversation'

export default function activeConversation(state = {}, action) {
    switch (action.type) {
        case SET_ACTIVE:
            
            return Object.assign({}, state, action.conversation)
    
        default:
            return Object.assign({}, state)
    }

}