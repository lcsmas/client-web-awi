import { createFetchableSlice } from 'redux/slices/utilities'

const propositions = createFetchableSlice({
    name: 'propositions',
    initialState: {
        selected: undefined,
    },
    reducers: {
        select: {
            reducer: (state, action) => { state.selected = action.payload.selected },
            prepare: selected => ({ payload : { selected: selected } })
        }
    }
})

/* EXPORT ACTIONS */
export const updatePropositionsAnswers = data => propositions.thunks.updateChildSlice('answers', data)
export const { select: selectProposition } = propositions.actions
export const { fetch: fetchPropositions, post: postProposition } = propositions.thunks

/* EXPORT REDUCER */
export default propositions.reducer