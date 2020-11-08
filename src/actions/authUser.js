export const AUTH_USER = "AUTH_USER"
export const REGISTER_USER = "REGISTER_USER"
export const SIGN_OUT_USER = "SIGN_OUT_USER"
export const UPDATE_USER = "UPDATE_USER"


export function authUser(snapshot) {
    return {
        type: AUTH_USER,
        snapshot: snapshot,
    }
}

export function signOutUser() {
    return {
        type: SIGN_OUT_USER
    }
}

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        user
    }
}

export function registerUser(user) {
    return {
        type: REGISTER_USER, 
        user
    }
}

