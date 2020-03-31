import { POST_SLICE_BEGIN, POST_SLICE_SUCCESS, POST_SLICE_FAILURE, ADD_SLICE } from '../actions/actionTypes'
import { addSlice } from "../actions/sliceActions";
import { deepCloneNormalizedState } from '../helpers/helpers'
import { ENTITIES } from "../schema";

export default (state, action) => {
    const nextState = {...state}
    const { slice } = action.payload || {slice: undefined}
    switch (action.type) {
        case POST_SLICE_BEGIN:
            return {...nextState, isPosting: true, slice }
        case POST_SLICE_FAILURE:
            const { error } = action.payload
            return {...nextState, isPosting: false, error, slice }
        case POST_SLICE_SUCCESS:
            const { res, receivedAt, postedData } = action.payload
            //addSlice(slice, postedData)
            return {...nextState, isPosting: false, slice, res, postedData, receivedAt }
        case ADD_SLICE :
            switch (slice) {
                case ENTITIES.ANSWERS:
                    return nextState;      
                case ENTITIES.PROPOSITIONS:
                    return nextState; 
                case ENTITIES.USERS:
                    return nextState; 
                case ENTITIES.TAGS:
                    return nextState;       
                default:
                    return nextState;
            }
        default:
            return nextState;
    }
}