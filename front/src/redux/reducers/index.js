import {combineReducers} from "redux";
import user from "./user";
import create from "./create";
import edit from "./edit"
const reducers = combineReducers({
    user,
    create,
    edit
});
export default reducers;