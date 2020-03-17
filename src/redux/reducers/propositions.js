import { REQUEST_PROPOSITIONS, INVALIDATE_PROPOSITIONS, RECEIVE_PROPOSITIONS } from '../actions/actionTypes';
import {deepCloneNormalizedState} from '../helpers/helpers';

const initialState = {
    isFetching : false,
    didInvalidate : false,
    lastUpdated: undefined,
    allIds : [],
    byIds : {}
}

export default (state = initialState, action) => {
    const nextState = deepCloneNormalizedState(state);
    switch(action.type) {
        case INVALIDATE_PROPOSITIONS:
            return {...nextState, didInvalidate: true};
        case REQUEST_PROPOSITIONS:
            return {...nextState, isFetching: true, didInvalidate: false};
        case RECEIVE_PROPOSITIONS:
            const { propositions } = action.payload;
            propositions.forEach(prop => {
                nextState.byIds = {
                    ...nextState.byIds, 
                    [prop.id]: {
                        id: prop.id,
                        title: prop.title,
                        isAnon: prop.isAnon,
                        nbLikes: prop.nbLikes,
                        owner: prop.owner,
                        tags: prop.tags,
                        answers: prop.answers, 
                    }
                }
            });
            return { 
                ...nextState,
                isFetching: false, 
                didInvalidate: false, 
                lastUpdated: action.payload.receivedAt 
            };
        default:
            return state;
    }
}