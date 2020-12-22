import React, { Component } from 'react'
import { connect } from 'react-redux'
import  {userSignIn} from '../../redux/actions/userActions'


class SignIn extends Component {
    state = {
                UserName:"",
                Password:"",
                EMail:""
            
        
    }
    onChange = (e) =>  {
        this.setState({
            [e.target.name] : [e.target.value]
        })
        
    }
    render() {
        console.log(this.state.UserName)
        console.log(this.state.Password)
        console.log(this.state.EMail)
        return (
            <div>
                <input name={"UserName"} onChange={this.onChange} />
                <br/>
                <input name={"Password"} onChange={this.onChange} />
                <br/>
                <input name={"EMail"} onChange={this.onChange} />
                <br/>
                <button onClick={() => this.props.userSignIn(this.state.UserName, this.state.Password, this.state.EMail)}>Kayıt ol</button>
            </div>
        )
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
        userSignIn
}

export default connect(MapStateToProps, MapDispatchToProps)(SignIn)