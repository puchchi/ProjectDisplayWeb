import { combineReducers } from "redux";
import loginReducer from "./logindetail/loginReducer";
import searchDetailReducer from "./searchdetail/searchDetailReducer";

const rootReducer = combineReducers({
    loginDetail: loginReducer,
    searchDetail: searchDetailReducer
})

export default rootReducer