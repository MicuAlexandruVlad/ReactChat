export const SET_ACTIVE = "SET_ACTIVE"

export function setActive(conversation) {
    return {
        type: SET_ACTIVE,
        conversation
    }
}