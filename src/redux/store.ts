import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import reduceProfile from "./reduceProfile";
import reduceUsers from "./reduceUsers";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import appReducer from "./appReducer";

type ReducersType = typeof reducers
export type StateType = ReturnType<ReducersType>

const reducers = combineReducers({
    profilePage: reduceProfile,
    usersPage: reduceUsers,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

//const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;