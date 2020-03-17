import { combineReducers } from 'redux';
import answers from './answers';
import users from './users';
import proposition from './propositions'

export default combineReducers({answers, users});