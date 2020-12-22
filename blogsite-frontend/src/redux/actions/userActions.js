import * as actionTypes from './actionTypes'
import Authentication from '../../services/authentication'
import * as axios from "axios"


export function userLogin(UserViewModel){
    return dispatch =>{axios.post("https://localhost:5001/api/User/login",{UserName:UserViewModel.UserName,Password:UserViewModel.Password})
    .then((res) => {
        Authentication(res.data.token)
        dispatch({type: actionTypes.USER_LOGIN, payload:res.data})
    }).catch((error) => {
        dispatch({type : actionTypes.LOGIN_ERROR, payload:error.response.data})
    })}
            
}

export function userSignIn(username, password, email){
    return dispatch => {axios.post("https://localhost:5001/api/User",{UserName: username, Password:password,EMail:email})
    .then(res => {console.log(res); dispatch({type: actionTypes.USER_SIGN, payload: res.data})})
}
}

export function EMailVertification(userID){

    return dispatch => axios.get("https://localhost:5001/api/User"+userID)
    .then(response => dispatch({type:actionTypes.EMAIL_VERTIFICATION, payload: response.payload}))
}

export function userLogOut(){
    Authentication(null)
    return dispatch => dispatch({type: actionTypes.USER_LOGOUT,payload: null})
}