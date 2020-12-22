import * as actionTypes from './actionTypes'
import * as axios from "axios"

export function addArticle(content, title, category){
    return dispatch =>
    {
    axios.post("https://localhost:5001/api/Article",{Title: title , Content : content, CategoryID: category })
    .then(response => dispatch({type:actionTypes.ADD_ARTICLE, payload:response.data})).catch(error => console.log(error))
    }
}

export function GetAllArticles(){
    return (dispatch) => {axios.get("https://localhost:5001/api/Article")
    .then(response =>{
        console.log(response)
        dispatch({type:actionTypes.GET_ALL_ARTICLES, payload:response.data.result})} )}
}

export function GetArticleWithID(id){
    return (dispatch) => {axios.get("https://localhost:5001/api/Article/getarticle/"+id)
    .then(response =>{
        dispatch({type:actionTypes.GET_ARTICLE, payload:response.data.result})} )}
}

export  function GetNonConfirmedArticles(){
    return (dispatch) => {axios.get("https://localhost:5001/api/Article/editorarticles")
    .then(response => dispatch({type:actionTypes.GET_NONCONFIRMED_ARTICLES, payload : response.data.result}) )
}
}

export  function EditArticles(content, title, id){
    return (dispatch) => {axios.post("https://localhost:5001/api/Article/edit/"+id,{Content: content, Title: title})
    .then(response => dispatch({type:actionTypes.EDIT_ARTICLE, payload: response.data})).catch(err => console.log(err))
}
}


export  function SearchArticle(key){
    return (dispatch) =>
    {
    axios.get("https://localhost:5001/api/Article/search/"+key)
    .then(response =>  dispatch({type:actionTypes.SEARCH_ARTICLE, payload:response.data.result})).catch(res => console.log(res))
    }
}

export  function GetAllCategories(){
    return (dispatch) =>
    {
    axios.get("https://localhost:5001/api/Category")
    .then(response =>  dispatch({type:actionTypes.GET_ALL_CATEGORIES, payload:response.data}))
    }
}

    export function GetUserArticles(username){
        return (dispatch) =>
        {
        axios.get("https://localhost:5001/api/Article/getuser/"+username)
        .then(response =>  dispatch({type:actionTypes.GET_USER_ARTICLES, payload:response.data.result}))
        }
    }

    export function GetCategoryArticles(categoryName){
        return (dispatch) => {
            axios.get("https://localhost:5001/api/Article/category/"+categoryName)
            .then(response => dispatch({type:actionTypes.GET_CATEGORY_ARTICLES, payload:response.data.result})).catch(err => console.log(err))
        }
    }