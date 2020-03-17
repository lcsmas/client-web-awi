import { ADD_ANSWER, DELETE_ANSWER } from '../actions/actionTypes'

const initialState = {
    allIds: [],
    byIds: {}
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ADD_ANSWER: {
            const {id, content, userId, isAnon} = action.payload
            return {
                ...state,
                allIds : [...state.allIds, id],
                byIds : {
                    ...state.byIds,
                    [id] : {
                        userId,
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
        default:
            return state;
    }
}