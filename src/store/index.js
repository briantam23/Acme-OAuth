import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { authReducer } from './reducer';


const reducer = combineReducers({
    auth: authReducer
})


export default createStore(reducer, applyMiddleware(thunk, logger));