import { createFetchableSlice } from 'redux/slices/utilities'
import API from 'api'
import { getToken } from "redux/selectors/selectors"

const propositions = createFetchableSlice({
    name: 'propositions',
    initialState: {
        selected: undefined,
    },
    reducers: {
        select: {
            reducer: (state, action) => { state.selected = action.payload.selected },
            prepare: selected => ({ payload : { selected: selected } })
        },
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
                //state.idLikes.push(action.payload.id)
            },
            prepare: res => ({ payload : { id : res.id } })
        },
        dislikeSuccess: { 
            reducer: (state, action) => { 
                state.fetchState.isDisliking = false;
                //state.idLikes.splice(state.idLikes.indexOf(action.payload.id),1)
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

/* EXPORT ACTIONS */
export const updatePropositionsAnswers = data => propositions.thunks.updateChildSlice('answers', data)
export const likeProposition = id => (dispatch, getState) => {
    const token = getToken(getState());
    const dispatchLikeSuccess = res => dispatch(propositions.actions.likeSuccess(res))
    const dispatchLikeFailure = err => dispatch(propositions.actions.likeFailure(err))
    dispatch(propositions.actions.likeBegin());
    return API.likeSlice('propositions', token, id).then(dispatchLikeSuccess, dispatchLikeFailure)
}
export const dislikeProposition = id => (dispatch, getState) => {
    const token = getToken(getState());
    const dispatchDislikeSuccess = res => dispatch(propositions.actions.dislikeSuccess(res))
    const dispatchDislikeFailure = err => dispatch(propositions.actions.dislikeFailure(err))
    dispatch(propositions.actions.dislikeBegin());
    return API.dislikeSlice('propositions', token, id).then(dispatchDislikeSuccess, dispatchDislikeFailure)
}
export const { select: selectProposition } = propositions.actions
export const { fetch: fetchPropositions, post: postProposition, fetchReported: fetchReportedPropositions } = propositions.thunks

/* EXPORT REDUCER */
export default propositions.reducer