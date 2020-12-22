import axios from "axios"

export default function Authentication(token){
    localStorage.setItem("jwtToken",token)
    if(token!= null){
        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`
        return true;
    }
    else{
        delete axios.defaults.headers.common["Authorization"]
        localStorage.removeItem("jwtToken");
        return true
    }
}