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

export const setSearchFilters = (filters) =>{
    return {
        type: SET_SEARCH_FILTERS,
        payload: filters
    }
}

// export const setSearchLocation = (location) => {
//     return {
//         type: SET_SEARCH_LOCATION,
//         payload: location
//     }
// }

// export const setSearchService = (service) => {
//     return {
//         type: SET_SEARCH_SERVICE,
//         payload: service
//     }
// }

// export const setSearchCancellationPolicy = (cancellationPolicy) => {
//     return {
//         type: SET_SEARCH_CANCELLATION_POLICY,
//         payload: cancellationPolicy
//     }
// }

// export const setSearchMinPrice = (minPrice) => {
//     return {
//         type: SET_SEARCH_MIN_PRICE,
//         payload: minPrice
//     }
// }

// export const setSearchMaxPrice = (maxPrice) => {
//     return {
//         type: SET_SEARCH_MAX_PRICE,
//         payload: maxPrice
//     }
// }

// export const setSearchCalenderDate = (calenderDate) => {
//     return {
//         type: SET_SEARCH_CALENDER_DATE,
//         payload: calenderDate
//     }
// }

// export const setSearchMinCompletedProjects = (minCompletedProjects) => {
//     return {
//         type: SET_SEARCH_MIN_COMPLETED_PROJECTS,
//         payload: minCompletedProjects
//     }
// }

// export const setSearchMinReview = (minReview) => {
//     return {
//         type: SET_SEARCH_MIN_REVIEW,
//         payload: minReview
//     }
// }