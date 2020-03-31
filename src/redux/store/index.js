import rootReducer from 'redux/reducers';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'

const middleware = process.env.NODE_ENV !== 'production' ?
  [require('redux-immutable-state-invariant').default(), thunk] :
  [thunk];

export default configureStore({
  reducer: rootReducer,
  middleware: middleware,
})
