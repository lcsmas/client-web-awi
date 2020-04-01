import answers from 'redux/slices/answers'
import users from 'redux/slices/users'
import propositions from 'redux/slices/propositions'
import tags from 'redux/slices/tags'
import { combineReducers } from "redux";

export default combineReducers({ answers, users, propositions, tags})