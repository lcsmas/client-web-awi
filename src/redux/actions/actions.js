import { 
    ADD_ANSWER, 
    DELETE_ANSWER, 
    CONNECT_USER, 
    DISCONNECT_USER,
} from './actionTypes';

let nextAnswerId = 10;

export const addAnswer = (content, userId, isAnon) => ({
    type: ADD_ANSWER,
    payload: {
        id: ++nextAnswerId,
        userId,
        content,
        isAnon
    }
})

export const deleteAnswer = id => ({
    type: DELETE_ANSWER,
    payload: { id }
})

export const connectUser = (id, name) => ({
    type : CONNECT_USER,
    payload : { currentUserId : id, name }
})

export const disconnectUser = id => ({
    type : DISCONNECT_USER,
})

