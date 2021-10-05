import { createStore } from "redux";
import loginReducer from "./logindetail/loginReducer";

const store = createStore(loginReducer)

export default store