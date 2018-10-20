import { SET_AUTH, DELETE_AUTH, CREATE_ADDRESS, DELETE_ADDRESS} from './constants';
import axios from 'axios';


const _setAuth = auth => ({
    type: SET_AUTH,
    auth
})

export const setAuth = () => (
    dispatch => (
        axios.get('/api/users')
            .then(res => res.data)
            .then(auth => dispatch(_setAuth(auth)))
    )
)

const _deleteAuth = auth => ({
    type: DELETE_AUTH,
    auth
})

export const deleteAuth = auth => (
    dispatch => (
        axios.delete(`/api/users/${auth.id}`)
            .then(() => dispatch(_deleteAuth(auth)))
    )
)

const _createAddress = address => ({
    type: CREATE_ADDRESS,
    address
})

export const createAddress = (address, auth) => (
    dispatch => (
        axios.post('/api/addresses', { ...address, userId: auth.id })
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