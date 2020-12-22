import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {userLogin}from '../../redux/actions/userActions'


class Login extends Component {
    state = {
            userViewModel:{
                UserName:"",
                Password:"",
                isAuthenticated: false
            },
            
        
    }
    onChange = (e) =>  {
        const value = e.target.value
        this.setState({
            userViewModel : {...this.state.userViewModel, [e.target.name]:value}
        })
        
    }

    
    render() {
        console.log(this.state.userViewModel)
        console.log(this.props.isAuthenticated)
        if(this.props.isAuthenticated === true){
            return(<Redirect to="/"/>)
        }
        else{
        return (
            <div className = "col-7 d-inline-block">
                <h1>Giriş Yap</h1>
                {this.props.isAuthenticated === false? (<div>{this.props.error}</div>): null}
                <label className="form-label">Kullanıcı Adı</label>
                <input name={"UserName"} className="form-control" onChange={this.onChange} />
                <label class="form-label">Şifre</label>
                <input name={"Password"} className="form-control" onChange={this.onChange} />
                <button className="btn btn-primary" onClick={() => this.props.userLogin(this.state.userViewModel)}>Login</button>
            </div>
        )
    }
}
}
function MapStateToProps(state){
    return {
        userViewModel : state.userReducer.UserViewModel,
        isAuthenticated : state.userReducer.isAuthenticated,
        error : state.userReducer.Error
    }
    
}

const MapDispatchToProps = {
        userLogin
}

export default connect(MapStateToProps, MapDispatchToProps)(Login)