import { LOAD_INITIAL_ADDRESSES, LOAD_INITIAL_USERS, CREATE_ADDRESS, DELETE_ADDRESS } from './constants';
import axios from 'axios';


const _loadInitialAddresses = addresses => ({
    type: LOAD_INITIAL_ADDRESSES,
    addresses
})

export const loadInitialAddresses = () => (
    dispatch => (
        axios.get('/api/addresses')
            .then(res => res.data)
            .then(addresses => dispatch(_loadInitialAddresses(addresses)))
    )
)

const _loadInitialUsers = users => ({
    type: LOAD_INITIAL_USERS,
    users
})

export const loadInitialUsers = () => (
    dispatch => (
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => dispatch(_loadInitialUsers(users)))
    )
)

const _createAddress = address => ({
    type: CREATE_ADDRESS,
    address
})

export const createAddress = address => (
    dispatch => (
        axios.post('/api/addresses', address)
            .then(res => res.data)
            .then(address => dispatch(_createAddress(address)))
    )
)

const _deleteAddress = address => ({
    type: DELETE_ADDRESS,
    address
})

export const deleteAddress = address => (
    dispatch => (
        axios.delete(`/api/addresses/${address.id}`)
            .then(() => dispatch(_deleteAddress(address)))
    )
)