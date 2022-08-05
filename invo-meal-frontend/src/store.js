import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {
    adminReducer,
    allDesignationsReducer,
    loginReducer,
    registerReducer, usersReducer,
} from "./redux/reducer";

const initialState = {};

const reducer = combineReducers({
    allDesignations: allDesignationsReducer,
    register: registerReducer,
    login: loginReducer,
    usersRedux: usersReducer,
    adminRedux: adminReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);
export default store;
