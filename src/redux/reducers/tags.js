import {
    FETCH_TAGS_BEGIN,
    FETCH_TAGS_SUCCESS,
    FETCH_TAGS_FAILURE
} from '../actions/actionTypes';
import { deepCloneNormalizedState } from '../helpers/helpers';

export default (state = {
    fetchState : {
        isFetching: false,
        lastUpdated: undefined,
        error: undefined,
        didInvalidate: false
    },
    allIds : [],
    byIds : {}
}, action) => {
    const nextState = deepCloneNormalizedState(state);
    switch (action.type) {
        case FETCH_TAGS_BEGIN:
            return {...nextState, fetchState: {isFetching: true}}
        case FETCH_TAGS_FAILURE:
            return {...nextState, fetchState: {isFetching: false, error: action.payload.error}};
        case FETCH_TAGS_SUCCESS:
            const { tags } = action.payload;
            for (let id in tags) {
                const tag = tags[id];
                !nextState.allIds.includes(id) && nextState.allIds.push(id)
                nextState.byIds = {
                    ...nextState.byIds,
                    [id]: {
                        id: tag.id,
                        title: tag.title,
                    }
                }
            }
            return {...nextState, fetchState: {isFetching: false, didInvalidate: false, lastUpdated: action.payload.receivedAt}};
        default:
            return nextState;
    }
}