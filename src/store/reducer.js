import { SET_AUTH, REMOVE_AUTH, CREATE_ADDRESS, DELETE_ADDRESS } from './constants';


export const authReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_AUTH:
            return action.auth;
        case CREATE_ADDRESS:
            return { ...state, addresses: [...state.addresses, action.address] };
        case DELETE_ADDRESS:
            return { ...state, addresses: state.addresses.filter(address => address.id !== action.address.id) };
        case REMOVE_AUTH:
            return {};
        default:
            return state;
    }
}