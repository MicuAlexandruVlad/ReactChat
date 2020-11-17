export const NEW_ACTIVE_MESSAGE = 'NEW_ACTIVE_MESSAGE'
export const GET_ACTIVE_MESSAGES = 'GET_ACTIVE_MESSAGES'

export function getActiveMessages(messages) {
    return { 
        type: GET_ACTIVE_MESSAGES,
        messages
    }
}

export function newActiveMessage(message) {
    return { 
        type: NEW_ACTIVE_MESSAGE,
        message
    }
}