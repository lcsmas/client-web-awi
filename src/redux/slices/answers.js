import { createFetchableSlice } from 'redux/slices/utilities'
import API from 'api'
import { getToken } from "redux/selectors/selectors";

const answers = createFetchableSlice({
    name: 'answers',
    initialState: {
        fetchState: {
            isLiking: false,
            isDisliking: false
        }
    },
    reducers: {
        likeBegin: state => { state.fetchState.isLiking = true },
        likeFailure: {
            reducer: (state, action) => {
                state.fetchState.isLiking = false;
                state.fetchState.error = action.payload.error;
            },
            prepare: error => ({ payload: { error: error.message } })
        },
        likeSuccess: { 
            reducer: (state, action) => { 
                state.fetchState.isLiking = false;
            },
            prepare: res => ({ payload : { id : res.id } })
        },
        likeBegin: state => { state.fetchState.isLiking = true },
        likeFailure: {
            reducer: (state, action) => {
                state.fetchState.isLiking = false;
                state.fetchState.error = action.payload.error;
            },
            prepare: error => ({ payload: { error: error.message } })
        },
        dislikeSuccess: { 
            reducer: (state, action) => { 
                state.fetchState.isDisliking = false;
            },
            prepare: res => ({ payload : { id : res.id } })
        },
        dislikeBegin: state => { state.fetchState.isDisliking = true },
        dislikeFailure: {
            reducer: (state, action) => {
                state.fetchState.isDisliking = false;
                state.fetchState.error = action.payload.error;
            },
            prepare: error => ({ payload: { error: error.message } })
        },
    }
})

export const likeAnswer = id => (dispatch, getState) => {
    const token = getToken(getState());
    const dispatchLikeSuccess = res => dispatch(answers.actions.likeSuccess(res))
    const dispatchLikeFailure = err => dispatch(answers.actions.likeFailure(err))
    dispatch(answers.actions.likeBegin());
    return API.likeSlice('answers', token, id).then(dispatchLikeSuccess, dispatchLikeFailure)
}
export const dislikeAnswer = id => (dispatch, getState) => {
    const token = getToken(getState());
    const dispatchDislikeSuccess = res => dispatch(answers.actions.dislikeSuccess(res))
    const dispatchDislikeFailure = err => dispatch(answers.actions.dislikeFailure(err))
    dispatch(answers.actions.dislikeBegin());
    return API.dislikeSlice('answers', token, id).then(dispatchDislikeSuccess, dispatchDislikeFailure)
}
export const { fetch: fetchAnswers, post: postAnswer, fetchReported: fetchReportedAnswers, delete: deleteAnswer } = answers.thunks
export default answers.reducer