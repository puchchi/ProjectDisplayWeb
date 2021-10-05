import { SET_USER_LOGGED_IN, SET_USER_LOGGED_OUT } from "./loginTypes";

const initialState = {
    isUserLoggedIn: false
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_LOGGED_IN:
            return {
                isUserLoggedIn:true
            }
        case SET_USER_LOGGED_OUT:
            return {
                isUserLoggedIn:false
            }
        default: return state
    }
}

export default loginReducer