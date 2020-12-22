import * as actionTypes from "../actions/actionTypes"
import {initialState} from "./initialState"


export default function userLoginReducer(state = initialState.UserViewModel, action){
    switch (action.type) {
        case actionTypes.USER_LOGIN:
          return{
              ...state,
              isAuthenticated: true,
              UserViewModel : action.payload
            };
        case actionTypes.LOGIN_ERROR:
            return{
                ...state,
                isAuthenticated: false,
                Error: action.payload
            };
        case actionTypes.USER_LOGOUT:
            return{
                ...state,
                isAuthenticated: false
            }
        case actionTypes.USER_SIGN:
            return{
                ...state,
                isCompleted : true
            }
        case actionTypes.EMAIL_VERTIFICATION:
            return{
                ...state,
                isVertificated : true
            }
        default:
            return state;
    }
}