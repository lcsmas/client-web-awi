import { CONNECT_USER, DISCONNECT_USER } from '../actions/actionTypes';

const initialState = {
    currentUserId: undefined,
    allIds : [],
    byIds : {}
}

export default (state = initialState, action) => {
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
        default:
            return state;
    }
}
