import { createFetchableSlice } from "redux/slices/utilities";
import API from "api";

const users = createFetchableSlice({
  name: "users",
  initialState: {
    connectionState: {
      isConnecting: false,
      isRegistering: undefined,
      registerSuccess: false,
      error: undefined,
      token: undefined
    }
  },
  reducers: {
    authSuccess: {
      reducer: (state, action) => {
        state.connectionState.isConnecting = false;
        state.connectionState.token = action.payload.token;
        
      },
      prepare: res => ({ payload: { token: res.token } })
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
      reducer: state => {
        state.connectionState.isRegistering = true;
      }
    },
    registerFailure: {
      reducer: (state, action) => {
        state.connectionState.isRegistering = false;
        state.connectionState.error = action.payload.error;
      },
      prepare: error => ({ payload: { error: error } })
    },
    registerSuccess: {
      reducer: (state, action) => {
        state.connectionState.isRegistering = false;
        state.connectionState.registerSuccess = true;
        action.payload.history.push("/");
      },
      prepare: history => ({ payload: { history: history } })
    },
    registerReset: state => {
      state.connectionState.registerSuccess = undefined;
    },
    disconnect: state => {
      state.connectionState.token = undefined;
    }
  }
});

/* EXPORT ACTIONS */
export const connectUser = (pseudo, mdp) => dispatch => {
  dispatch(users.actions.authBegin());
  const resolve = res => dispatch(users.actions.authSuccess(res));
  const reject = err => dispatch(users.actions.authFailure(err));
  return API.authenticate(pseudo, mdp).then(resolve,reject);
};
export const registerUser = (pseudo, password, mail, history) => dispatch => {
  dispatch(users.actions.registerBegin());
  const resolve = res => dispatch(users.actions.registerSuccess(history));
  const reject = err => dispatch(users.actions.registerFailure(err))
  return API.register(pseudo, password, mail).then(resolve, reject)
  
};
export const { disconnect: disconnectUser } = users.actions;
export const { post: postUser, fetch: fetchUsers } = users.thunks;

/* EXPORT REDUCER */
export default users.reducer;
