import {combineReducers} from "redux"
import userReducer from './userReducer'
import articleReducer from './articleReducer'

const rootreducer = combineReducers({
    userReducer,
    articleReducer
})

export default rootreducer;