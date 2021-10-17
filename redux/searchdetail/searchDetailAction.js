import { SET_SEARCH_LOCATION, SET_SEARCH_SERVICE } from "./searchDetailTypes";

export const setSearchLocation = (location) => {
    return {
        type: SET_SEARCH_LOCATION,
        payload: location
    }
}

export const setSearchService = (service) => {
    return {
        type: SET_SEARCH_SERVICE,
        payload: service
    }
}