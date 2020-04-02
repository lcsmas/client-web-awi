import rootReducer from 'redux/slices';
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";

let middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware = [require('redux-immutable-state-invariant').default(), thunk]
} else {
  middleware = [require('redux-immutable-state-invariant').default(),thunk]
}

export default configureStore({
  reducer: rootReducer,
  middleware: middleware,
})
