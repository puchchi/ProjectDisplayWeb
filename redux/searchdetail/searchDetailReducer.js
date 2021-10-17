import { SET_SEARCH_LOCATION, SET_SEARCH_SERVICE } from "./searchDetailTypes";

const initialState = {
    searchLocation:"",
    searchService :""
}

const searchDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_LOCATION:
            return {
                ...state,
                searchLocation: action.payload
            }
        case SET_SEARCH_SERVICE:
            return {
                ...state,
                searchService: action.payload
            }
        default: return state
    }
}

export default searchDetailReducer