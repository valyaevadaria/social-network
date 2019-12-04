import {combineReducers, createStore} from "redux";
import reduceProfile from "./reduceProfile";
import reduceUsers from "./reduceUsers";

const reducers = combineReducers({
    profilePage: reduceProfile,
    usersPage: reduceUsers
});

const store = createStore(reducers);

window.store = store;

export default store;