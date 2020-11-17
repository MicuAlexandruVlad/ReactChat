export const NEW_CONVERSATION = 'NEW_CONVERSATION'
export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION'

export function newConversation(conversation) {
    return {
        type: NEW_CONVERSATION,
        conversation
    }
}

export function updateConversation(conversation) {
    return {
        type: UPDATE_CONVERSATION,
        conversation
    }
}