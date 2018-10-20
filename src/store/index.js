import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { addressReducer, usersReducer } from './reducers';


const reducer = combineReducers({
    addresses: addressReducer,
    users: usersReducer
})


export default createStore(reducer, applyMiddleware(thunk, logger));