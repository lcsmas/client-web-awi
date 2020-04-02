import { createSlice } from "@reduxjs/toolkit";
import { getMapping } from "redux/schema";
import API from "api";

export const createFetchableSlice = ({ name, initialState, reducers }) => {
  const sliceMapping = getMapping(name);
  const initialFetchState = initialState ? initialState.fetchState : undefined;
  let slice = createSlice({
    name: name,
    initialState: {
      fetchState: {
        ...initialFetchState,
        isFetching: false,
        isPosting: false,
        isUpdating: false,
        postResult: undefined,
        updateResult: undefined,
        didInvalidate: false,
        lastUpdated: undefined,
        error: undefined,
        isFetchingReported: false,
      },
      ...initialState,
      allIds: [],
      byIds: {},
      reportedIds: []
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
      },
      fetchReportedBegin: state => { state.fetchState.isFetchingReported = true },
      fetchReportedSuccess: {
        reducer: (state, action) => {
          state.fetchState.isFetchingReported = false;
          action.payload.ids.forEach(val => state.reportedIds.push(val))
        },
        prepare: res => {
          
          let ids = []
          const entries = Object.entries(res);
          ids = entries.map(entry => entry[0])
          return ({ payload: { ids: ids } })
        }
      },
      fetchReportedFailure: state => { state.fetchState.isFetchingReported = false;}
    }
  });
  slice.thunks = {
    fetch: () => dispatch => {
      const dispatchFetchSuccess = res => dispatch(slice.actions.fetchSuccess(res));
      const dispatchFetchFailure = err => dispatch(slice.actions.fetchFailure(err.message));
      dispatch(slice.actions.fetchBegin());
      return API.fetchSlice(name).then(dispatchFetchSuccess, dispatchFetchFailure);
    },
    post: (data, token) => dispatch => {
      const dispatchPostSuccess = res => dispatch(slice.actions.postSuccess(res));
      const dispatchPostFailure = err => dispatch(slice.actions.postFailure(err.message));
      dispatch(slice.actions.postBegin());
      return API.postSlice(name, data, token).then(dispatchPostSuccess, dispatchPostFailure);
    },
    fetchReported: token => dispatch => {
      const dispatchFetchSuccess = res => dispatch(slice.actions.fetchReportedSuccess(res));
      const dispatchFetchFailure = err => dispatch(slice.actions.fetchReportedFailure(err.message));
      dispatch(slice.actions.fetchReportedBegin());
      return API.fetchReported(name, token).then(dispatchFetchSuccess, dispatchFetchFailure);
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
