import { 
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
} from './actionTypes';
import * as API from '../../api'


const fetchUsersBegin = () => ({
    type : FETCH_USERS_BEGIN
})
const fetchUsersSuccess = (json) => ({
    type : FETCH_USERS_SUCCESS,
    payload : {
        users : json,
        receivedAt : Date.now()
    }
})
const fetchUsersFailure = (error) => ({
    type : FETCH_USERS_FAILURE,
    payload: {
        error
    }
})

export const fetchUsers = () => dispatch => {
    dispatch(fetchUsersBegin());
    return (
        API.fetchUsers()
        .catch(err => dispatch(fetchUsersFailure(err.message)))
        .then(res => dispatch(fetchUsersSuccess(res)))
    )
}