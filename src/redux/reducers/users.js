import { 
    CONNECT_USER, 
    DISCONNECT_USER,
    FETCH_USERS_BEGIN,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE
 } from '../actions/actionTypes';
import { deepCloneNormalizedState } from "../helpers/helpers";

const initialState = {
    currentUserId: undefined,
    fetchState : {
        isFetching: false,
        lastUpdated: undefined,
        error: undefined,
    },
    allIds : [],
    byIds : {}
}

export default (state = initialState, action) => {
    const nextState = deepCloneNormalizedState(state)
    switch (action.type) {
        case CONNECT_USER:
            const {currentUserId, name} = action.payload;
            return {
                ...state, 
                currentUserId : currentUserId, 
                allIds : [...state.allIds, currentUserId],
                byIds : {
                    ...state.byIds, 
                    [currentUserId] : { 
                        name
                    }
                }
            };
        case DISCONNECT_USER:
            return {
                ...state, 
                currentUserId : undefined,
            };
        case FETCH_USERS_BEGIN:
            return {...nextState, fetchState : { isFetching: true} };
        case FETCH_USERS_FAILURE:
            return {...nextState, fetchState : { isFetching: false } }
        case FETCH_USERS_SUCCESS:
            const { users } = action.payload;
            for (let id in users) {
                const user = users[id];
                nextState.allIds = [...nextState.allIds, user.id]
                nextState.byIds = {
                    ...nextState.byIds,
                    [id]: {
                        id: user.id,
                        name: user.pseudo,
                    }
                }
            }
            return {
                ...nextState,
                fetchState: {
                    isFetching: false,
                    lastUpdated: action.payload.receivedAt
                }

            };
        default:
            return state;
    }
}
