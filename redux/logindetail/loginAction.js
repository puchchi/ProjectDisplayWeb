import { SET_USER_LOGGED_IN, SET_USER_LOGGED_OUT } from "./loginTypes";

export const setUserLoggedIn = () => {
    return {
        type: SET_USER_LOGGED_IN
    }
}

export const setUserLoggedOut = () => {
    return {
        type: SET_USER_LOGGED_OUT
    }
}