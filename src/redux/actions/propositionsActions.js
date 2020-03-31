import {
    FETCH_PROPOSITIONS_BEGIN,
    FETCH_PROPOSITIONS_SUCCESS,
    FETCH_PROPOSITIONS_FAILURE,
    INVALIDATE_PROPOSITIONS,
    SELECT_PROPOSITION,
    UPDATE_PROPOSITIONS_BEGIN,
    UPDATE_PROPOSITIONS_FAILURE,
    UPDATE_PROPOSITIONS_SUCCESS,
    POST_PROPOSITIONS_BEGIN,
    POST_PROPOSITIONS_SUCCESS,
    POST_PROPOSITIONS_FAILURE
} from './actionTypes';
import API from "api"

export const selectProposition = (proposition) => ({
    type: SELECT_PROPOSITION,
    payload: {
        proposition
    }
})
const fetchPropositionsBegin = () => ({
    type: FETCH_PROPOSITIONS_BEGIN
})
const fetchPropositionsSuccess = (json) => ({
    type: FETCH_PROPOSITIONS_SUCCESS,
    payload: {
        propositions: json,
        receivedAt: Date.now()
    }
})
const fetchPropositionsFailure = (error) => ({
    type: FETCH_PROPOSITIONS_FAILURE,
    payload: {
        error
    }
})
export const invalidatePropositions = () => ({
    type: INVALIDATE_PROPOSITIONS
})
export const fetchPropositions = () => dispatch => {
    dispatch(fetchPropositionsBegin());
    return (
        API.fetchPropositions()
            .catch(err => dispatch(fetchPropositionsFailure(err.message)))
            .then(res => dispatch(fetchPropositionsSuccess(res)))
    )
}

const updatePropositionsBegin = () => ({ type: UPDATE_PROPOSITIONS_BEGIN, payload: { isUpdating: true } });
const updatePropositionsFailure = (err) => ({ type: UPDATE_PROPOSITIONS_FAILURE, payload: { isUpdating: false, err } });
const updatePropositionsSuccess = (res) => ({ type: UPDATE_PROPOSITIONS_SUCCESS, payload: { isUpdating: false, res } })
export const updatePropositionAnswers = data => dispatch => {
    dispatch(updatePropositionsBegin())
    return API.updatePropositionAnswers(data)
        .catch(err => dispatch(updatePropositionsFailure(err.message)))
        .then(res => dispatch(updatePropositionsSuccess(res)))
} 

const postPropositionsBegin = () => ({ type: POST_PROPOSITIONS_BEGIN, payload: { isPosting: true } });
const postPropositionsFailure = (err) => ({ type: POST_PROPOSITIONS_FAILURE, payload: { isPosting: false, err } });
const postPropositionsSuccess = (res) => ({ type: POST_PROPOSITIONS_SUCCESS, payload: { isPosting: false, res } })
export const postProposition = data => dispatch => {
    dispatch(postPropositionsBegin())
    return API.postProposition(data)
        .catch(err => dispatch(postPropositionsFailure(err.message)))
        .then(res => dispatch(postPropositionsSuccess(res)))
} 