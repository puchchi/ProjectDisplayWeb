import { SET_USER_LOGGED_IN, SET_USER_LOGGED_OUT } from "./loginTypes";

export const setUserLoggedIn = () => {
    console.log("logged in")
    return {
        type: SET_USER_LOGGED_IN
    }
}

export const setUserLoggedOut = () => {
    console.log("logged out")
    return {
        type: SET_USER_LOGGED_OUT
    }
}