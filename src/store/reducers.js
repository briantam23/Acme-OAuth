import { LOAD_INITIAL_ADDRESSES, LOAD_INITIAL_USERS, CREATE_ADDRESS, DELETE_ADDRESS } from './constants';


export const addressReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_ADDRESSES:
            return action.addresses;
        case CREATE_ADDRESS:
            return [...state, action.address];
        case DELETE_ADDRESS:
            return state.filter(address => address.id !== action.address.id);
        default:
            return state;
    }
}

export const usersReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_USERS:
            return action.users;
        default:
            return state;
    }
}