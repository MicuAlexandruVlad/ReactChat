import { NEW_CONVERSATION, UPDATE_CONVERSATION } from '../actions/conversations'

export default function conversations(state = [], action) {
    switch (action.type) {
        case NEW_CONVERSATION:
            let newState = Object.assign([], state, state.concat([action.conversation]))

            // console.log('Conversations len: ', newState.length)

            localStorage.setItem(`chat_conv_${action.conversation.id}`, JSON.stringify(action.conversation))

            return newState
        case UPDATE_CONVERSATION:

            //TODO: whenever a conv is updated in the store it should be updated in localstorage too
            let updatedState = Object.assign([], state)
            updatedState.map((conv) => {
                if (action.conversation.id === conv.id) {
                    conv.timestamp = action.conversation.timestamp
                    conv.lastMessage = action.conversation.lastMessage

                    localStorage.setItem(`chat_conv${action.conversation.id}`, JSON.stringify(action.conversation))
                } 

                return conv
            })

            return Object.assign([], state)
        default:
            return Object.assign([], state)
    }
}