import { createFetchableSlice } from "redux/slices/utilities";
import API from "api";

const users = createFetchableSlice({
  name: "users",
  initialState: {
    connectionState: {
      currentUserId: undefined,
      isConnecting: false,
      isRegistering: undefined,
      registerSuccess: false,
      error: undefined,
      token: undefined
    },
  },
  reducers: {
    authSuccess: {
      reducer: (state, action) => {
        const { currentUserId, token } = action.payload;
        state.connectionState.isConnecting = false;
        state.connectionState.token = token;
        state.connectionState.currentUserId = currentUserId;
      },
      prepare: res => ({ payload: { currentUserId: res.id, token: res.token } })
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
    registerBegin: {
      reducer: state => { state.connectionState.isRegistering = true }
    },
    registerFailure: {
      reducer: (state, action) => {
        state.connectionState.isRegistering = false;
        state.connectionState.error = action.payload.error;
      },
      prepare: error => ({ payload: { error: error } })
    },
    registerSuccess: {
      reducer: state => { 
        state.connectionState.isRegistering = false;
        state.connectionState.registerSuccess = true;
      },
    },
    disconnect: state => {
      state.connectionState.currentUserId = undefined;
      state.connectionState.token = undefined;
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
export const registerUser = (pseudo, password, mail) => dispatch => {
  dispatch(users.actions.registerBegin());
  return API.register(pseudo, password, mail)
    .then(dispatch(users.actions.registerSuccess()))
    .catch(err => { dispatch(users.actions.registerFailure(err)) })
}
export const { disconnect: disconnectUser } = users.actions;
export const { post: postUser, fetch: fetchUsers } = users.thunks;

/* EXPORT REDUCER */
export default users.reducer;
