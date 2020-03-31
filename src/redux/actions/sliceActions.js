import API from "api";
import {POST_SLICE_BEGIN, POST_SLICE_SUCCESS, POST_SLICE_FAILURE, ADD_SLICE} from "./actionTypes"
const fetchSliceBegin = (slice) => ({
    type: `FETCH_${slice.toUpperCase()}_BEGIN`,
})

const fetchSliceFailure = (slice, error) => ({
    type: `FETCH_${slice.toUpperCase()}_FAILURE`,
    payload: {
        error
    }
})

const fetchSliceSuccess = (slice, json) => ({
    type: `FETCH_${slice.toUpperCase()}_SUCCESS`,
    payload: {
        [slice]: json,
        receivedAt: Date.now()
    }
})

export const fetchSlice = slice => dispatch => {
    dispatch(fetchSliceBegin(slice));
    return (
        API.fetchSlice(slice)
            .catch(err => dispatch(fetchSliceFailure(slice, err.message)))
            .then(res => dispatch(fetchSliceSuccess(slice, res)))
    )
}

const postSliceBegin = slice => ({ type: POST_SLICE_BEGIN, payload: {slice} })
const postSliceFailure = (slice, error) => ({type: POST_SLICE_FAILURE, payload: {slice, error}})
const postSliceSuccess = (slice, postedData, res) => ({type: POST_SLICE_SUCCESS, payload: {slice, postedData, res, receivedAt: Date.now()}})
export const postSlice = (slice, dataToPost) => dispatch => {
    dispatch(postSliceBegin(slice));
    return API.postSliceRequest(slice, dataToPost)
    .catch(err => dispatch(postSliceFailure(slice, err.message)))
    .then(res => dispatch(postSliceSuccess(slice, dataToPost, res)))
}
export const addSlice = (slice, data) => ({
    type: ADD_SLICE,
    payload: {
        slice,
        data
    }
})