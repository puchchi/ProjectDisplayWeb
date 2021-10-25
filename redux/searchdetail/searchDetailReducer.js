import {
    // SET_SEARCH_LOCATION,
    // SET_SEARCH_SERVICE,
    // SET_SEARCH_CANCELLATION_POLICY,
    // SET_SEARCH_MIN_PRICE,
    // SET_SEARCH_MAX_PRICE,
    // SET_SEARCH_CALENDER_DATE,
    // SET_SEARCH_MIN_COMPLETED_PROJECTS,
    // SET_SEARCH_MIN_REVIEW,
    SET_SEARCH_FILTERS
} from "./searchDetailTypes";

const initialState = {
    searchLocation: "",
    searchService: "",
    searchLat: "",
    searchLng: "",
    searchCancellationPolicy: "",
    searchMinPrice: "",
    searchMaxPrice: "",
    searchCalenderDate: "",
    searchMinCompletedProjects: "",
    searchMinReview: ""
}

const searchDetailReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SEARCH_FILTERS:
            return {
                ...state,
                searchLocation: action.payload.searchLocation !== undefined ? action.payload.searchLocation : "",
                searchService: action.payload.searchService !== undefined ? action.payload.searchService : "",
                searchLat: action.payload.searchLat !== undefined ? action.payload.searchLat : "",
                searchLng: action.payload.searchLng !== undefined ? action.payload.searchLng : "",
                searchCancellationPolicy: action.payload.searchCancellationPolicy !== undefined ? action.payload.searchCancellationPolicy : "",
                searchMinPrice: action.payload.searchMinPrice !== undefined ? action.payload.searchMinPrice : "",
                searchMaxPrice: action.payload.searchMaxPrice !== undefined ? action.payload.searchMaxPrice : "",
                searchCalenderDate: action.payload.searchCalenderDate !== undefined ? action.payload.searchCalenderDate : "",
                searchMinCompletedProjects: action.payload.searchMinCompletedProjects !== undefined ? action.payload.searchMinCompletedProjects : "",
                searchMinReview: action.payload.searchMinReview !== undefined ? action.payload.searchMinReview : ""
            }
        // case SET_SEARCH_LOCATION:
        //     return {
        //         ...state,
        //         searchLocation: action.payload
        //     }
        // case SET_SEARCH_SERVICE:
        //     return {
        //         ...state,
        //         searchService: action.payload
        //     }

        // case SET_SEARCH_CANCELLATION_POLICY:
        //     return {
        //         ...state,
        //         searchCancellationPolicy: action.payload
        //     }
        // case SET_SEARCH_MIN_PRICE:
        //     return {
        //         ...state,
        //         searchMinPrice: action.payload
        //     }
        // case SET_SEARCH_MAX_PRICE:
        //     return {
        //         ...state,
        //         searchMaxPrice: action.payload
        //     }
        // case SET_SEARCH_CALENDER_DATE:
        //     return {
        //         ...state,
        //         searchCalenderDate: action.payload
        //     }
        // case SET_SEARCH_MIN_COMPLETED_PROJECTS:
        //     return {
        //         ...state,
        //         searchMinCompletedProjects: action.payload
        //     }
        // case SET_SEARCH_MIN_REVIEW:
        //     return {
        //         ...state,
        //         searchMinReview: action.payload
        //     }


        default: return state
    }
}

export default searchDetailReducer