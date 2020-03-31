import {
    FETCH_PROPOSITIONS_BEGIN,
    FETCH_PROPOSITIONS_SUCCESS,
    FETCH_PROPOSITIONS_FAILURE,
    INVALIDATE_PROPOSITIONS,
    SELECT_PROPOSITION,
    POST_PROPOSITIONS_BEGIN,
    POST_PROPOSITIONS_FAILURE,
    POST_PROPOSITIONS_SUCCESS
} from '../actions/actionTypes';
import { deepCloneNormalizedState } from '../helpers/helpers';

const initialState = {
    fetchState: {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: undefined,
        error: undefined,
    },
    selected : undefined,
    allIds: [],
    byIds: {}
}

export default (state = initialState, action) => {
    const nextState = deepCloneNormalizedState(state);
    switch (action.type) {
        case SELECT_PROPOSITION:
            return {...nextState, selected: action.payload.proposition}
        case INVALIDATE_PROPOSITIONS:
            return {
                ...nextState,
                fetchState: {
                    didInvalidate: true
                }
            };
        case FETCH_PROPOSITIONS_BEGIN:
            return {
                ...nextState,
                fetchState: {
                    isFetching: true,
                    didInvalidate: false
                }
            };
        case FETCH_PROPOSITIONS_SUCCESS:
            const { propositions } = action.payload;
            for (let id in propositions) {
                const prop = propositions[id];
                !nextState.allIds.includes(id) && nextState.allIds.push(id)
                nextState.byIds = {
                    ...nextState.byIds,
                    [id]: {
                        id: prop.id,
                        title: prop.title,
                        content: prop.content,
                        isAnon: prop.isAnon,
                        nbLikes: prop.nbLikes,
                        owner: prop.owner,
                        tags: prop.tags,
                        answers: prop.answers,
                    }
                }
            }
            return {
                ...nextState,
                fetchState: {
                    isFetching: false,
                    didInvalidate: false,
                    lastUpdated: action.payload.receivedAt
                }
            };
        case FETCH_PROPOSITIONS_FAILURE:
            const { error } = action.payload;
            return {
                ...nextState,
                fetchState: {
                    isFetching: false,
                    didInvalidate: false,
                    error
                }
            }
        case POST_PROPOSITIONS_BEGIN:
            return {...nextState, isPosting: action.payload.isPosting};
        case POST_PROPOSITIONS_FAILURE:
            return {...nextState, isPosting: action.payload.isPosting, err: action.payload.err};
        case POST_PROPOSITIONS_SUCCESS:
            return {...nextState, isPosting: action.payload.isPosting, res: action.payload.res};
        default:
            return nextState;
    }
}