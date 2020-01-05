import {applyMiddleware, combineReducers, createStore} from "redux";
import reduceProfile from "./reduceProfile";
import reduceUsers from "./reduceUsers";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
    profilePage: reduceProfile,
    usersPage: reduceUsers,
    auth: authReducer,
    form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;