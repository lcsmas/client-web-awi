import { createSlice } from "@reduxjs/toolkit";
import { getMapping } from "redux/schema";
import API from "api";

export const createFetchableSlice = ({ name, initialState, reducers }) => {
  const sliceMapping = getMapping(name);
  let slice = createSlice({
    name: name,
    initialState: {
      fetchState: {
        isFetching: false,
        isPosting: false,
        isUpdating: false,
        postResult: undefined,
        updateResult: undefined,
        didInvalidate: false,
        lastUpdated: undefined,
        error: undefined
      },
      ...initialState,
      allIds: [],
      byIds: {}
    },
    reducers: {
      ...reducers,
      fetchSuccess: {
        reducer: (state, action) => {
          const { sliceDatas } = action.payload;
          for (const id in sliceDatas) {
            const sliceData = sliceDatas[id];
            !state.allIds.includes(id) && state.allIds.push(id);
            sliceMapping.forEach(fieldMapping => {
              const clientFieldName = fieldMapping.client;
              const serverFieldName = fieldMapping.server;
              state.byIds = {
                ...state.byIds,
                [id]: {
                  ...state.byIds[id],
                  [clientFieldName]: sliceData[serverFieldName]
                }
              };
            });
          }
          state.fetchState.isFetching = false;
          state.fetchState.receivedAt = Date.now();
        },
        prepare: data => ({ payload: { sliceDatas: data } })
      },
      fetchBegin: {
        reducer: state => {
          state.fetchState.isFetching = true;
        }
      },
      fetchFailure: {
        reducer: (state, action) => {
          state.fetchState.isFetching = false;
          state.fetchState.error = action.payload.error;
        },
        prepare: error => ({ payload: { error: error } })
      },
      postSuccess: {
        reducer: (state, action) => {
          state.fetchState.isPosting = false;
          state.fetchState.postResult = action.payload.postResult;
        },
        prepare: postResult => ({ payload: { postResult: postResult } })
      },
      postBegin: state => {
        state.fetchState.isPosting = true;
      },
      postFailure: {
        reducer: (state, action) => {
          state.fetchState.isPosting = false;
          state.fetchState.error = action.payload.error;
        },
        prepare: error => ({ payload: { error: error } })
      },
      updateSuccess: {
        reducer: (state, action) => {
          state.fetchState.isUpdating = false;
          state.fetchState.updateResult = action.payload.updateResult;
        },
        prepare: updateResult => ({ payload: { updateResult: updateResult } })
      },
      updateBegin: state => {
        state.fetchState.isUpdating = true;
      },
      updateFailure: {
        reducer: (state, action) => {
          state.fetchState.isUpdating = false;
          state.fetchState.error = action.payload.error;
        },
        prepare: error => ({ payload: { error: error } })
      }
    }
  });
  slice.thunks = {
    fetch: () => dispatch => {
      dispatch(slice.actions.fetchBegin());
      return API.fetchSlice(name)
        .then(res => {
          dispatch(slice.actions.fetchSuccess(res));
        })
        .catch(err => {
          dispatch(slice.actions.fetchFailure(err.message));
        });
    },
    post: data => dispatch => {
      dispatch(slice.actions.postBegin());
      return API.postSlice(name, data)
        .then(res => {
          dispatch(slice.actions.postSuccess(res));
        })
        .catch(err => {
          dispatch(slice.actions.postFailure(err.message));
        });
    },
    updateChildSlice: (childSlice, data) => dispatch => {
      dispatch(slice.actions.updateBegin());
      return API.updateSliceOfSliceById(name, childSlice, data)
        .then(res => {
          dispatch(slice.actions.updateSuccess(res));
        })
        .catch(err => {
          dispatch(slice.actions.updateFailure(err.message));
        });
    }
  };
  return slice;
};
