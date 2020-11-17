export const NEW_MESSAGE = 'NEW_MESSAGE'
export const GET_MESSAGES = 'GET_MESSAGES'
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE'

export function newMessage(message) {
    return {
        type: NEW_MESSAGE, 
        message
    }
}

export function getMessages(sentSnapshot, receivedSnapshot) {
    return {
        type: GET_MESSAGES, 
        sentSnapshot, 
        receivedSnapshot
    }
}

export function updateMessage(messageId, newId) {
    return {
        type: UPDATE_MESSAGE, 
        id: messageId,
        newId: newId
    }
}