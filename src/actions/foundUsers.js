export const GET_USERS = "GET_USERS"

export function getUsers(snapshot) {
    return {
        type: GET_USERS,
        snapshot
    }
}
