import { createFetchableSlice } from "redux/slices/utilities";
import API from "api";

const users = createFetchableSlice({
  name: "users",
  initialState: {
    connectionState: {
      isConnecting: false,
      error: undefined
    },
    currentUserId: undefined
  },
  reducers: {
    authSuccess: {
      reducer: (state, action) => {
        const { currentUserId } = action.payload;
        state.connectionState.isConnecting = false;
        state.currentUserId = currentUserId;
      },
      prepare: res => ({ payload: { currentUserId: res.id } })
    },
    authBegin: state => {
      state.connectionState.isConnecting = true;
    },
    authFailure: {
      reducer: (state, action) => {
        state.connectionState.isConnecting = false;
        state.connectionState.error = action.payload.error;
      },
      prepare: error => ({ payload: { error: error } })
    },
    disconnect: state => {
      state.currentUserId = undefined;
    }
  }
});

/* EXPORT ACTIONS */
export const connectUser = (pseudo, mdp) => dispatch => {
  dispatch(users.actions.authBegin());
  return API.authenticate(pseudo, mdp)
    .then(res => {
      dispatch(users.actions.authSuccess(res));
    })
    .catch(err => {
      dispatch(users.actions.authFailure(err));
    });
};
export const { disconnect: disconnectUser } = users.actions;
export const { post: postUser, fetch: fetchUsers } = users.thunks;

/* EXPORT REDUCER */
export default users.reducer;
