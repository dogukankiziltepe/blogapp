import * as actionTypes from "../actions/actionTypes"
import {initialState} from "./initialState"

export default function userLoginReducer(state = initialState.article, action){
    switch (action.type) {
        
        case actionTypes.ADD_ARTICLE:
            console.log(action.payload)
            return{
                ...state,
                Added : true
            }
        case actionTypes.GET_ALL_ARTICLES:
            return{
                ...state,
                articles : action.payload
            }
        case actionTypes.GET_ARTICLE:
            return{
                ...state,
                article:action.payload
            }
        case actionTypes.GET_ALL_CATEGORIES:
            return{
                ...state,
                categories : action.payload
            }
        case actionTypes.SEARCH_ARTICLE:
            return {
                ...state,
                searchresult:action.payload
            };
        case actionTypes.GET_NONCONFIRMED_ARTICLES:
            return{
                ...state,
                nonconfirmed:action.payload
            }
        case actionTypes.EDIT_ARTICLE:
            return{
                ...state,
                edited : true
            }
        case actionTypes.GET_USER_ARTICLES:
            return{
                ...state,
                userarticles:action.payload
            }
        case actionTypes.GET_CATEGORY_ARTICLES:
            return{
                ...state,
                categoryarticles: action.payload
            }
        default:
            return state;
        
    }
}