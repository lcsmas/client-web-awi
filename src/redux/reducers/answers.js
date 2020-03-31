import { 
    ADD_ANSWER, 
    DELETE_ANSWER,
    FETCH_ANSWERS_SUCCESS,
    FETCH_ANSWERS_BEGIN,
    FETCH_ANSWERS_FAILURE
 } from '../actions/actionTypes'
 import { deepCloneNormalizedState } from '../helpers/helpers'

const initialState = {
    allIds: [],
    byIds: {}
}

export default (state = initialState, action) => {
    const nextState = deepCloneNormalizedState(state)
    switch(action.type) {
        case ADD_ANSWER: {
            const {id, content, userId, isAnon} = action.payload
            return {
                ...state,
                allIds : [...state.allIds, id],
                byIds : {
                    ...state.byIds,
                    [id] : {
                        id:userId,
                        content,
                        isAnon
                    }
                }
            };
        }
        case DELETE_ANSWER:{
            const deletedId = action.payload.id
            return {
                ...state,
                allIds : state.allIds.filter( id => id!==deletedId),
                byIds : { ...state.byIds, [deletedId] : undefined }
            }
        }
        case FETCH_ANSWERS_BEGIN:
            return {...nextState, fetchState: {isFetching: true}}
        case FETCH_ANSWERS_FAILURE:
            return {...nextState, fetchState: {isFetching: false, error: action.payload.error}};
        case FETCH_ANSWERS_SUCCESS:
            const { answers } = action.payload;
            for (let id in answers) {
                const answer = answers[id];
                !nextState.allIds.includes(id) && nextState.allIds.push(id)
                nextState.byIds = {
                    ...nextState.byIds,
                    [id]: {
                        id: answer.id,
                        content: answer.content,
                        isAnon: answer.isAnon,
                        owner: answer.owner,
                        nbLikes: answer.nbLikes
                    }
                }
            }
            return {...nextState, fetchState: {isFetching: false, didInvalidate: false, lastUpdated: action.payload.receivedAt}};
        default:
            return state;
    }
}