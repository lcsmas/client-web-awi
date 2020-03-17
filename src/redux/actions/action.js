import { 
    ADD_ANSWER, 
    DELETE_ANSWER, 
    CONNECT_USER, 
    DISCONNECT_USER,
    REQUEST_PROPOSITIONS,
    INVALIDATE_PROPOSITIONS,
    RECEIVE_PROPOSITIONS
} from './actionTypes';

let nextAnswerId = 0;

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

export const requestPropositions = () => ({
    type : REQUEST_PROPOSITIONS
})

export const invalidatePropositions = () => ({
    type : INVALIDATE_PROPOSITIONS
})

export const receivePropositions = (json) => ({
    type : RECEIVE_PROPOSITIONS,
    payload : {
        propositions : json,
        receivedAt : Date.now()
    }
})