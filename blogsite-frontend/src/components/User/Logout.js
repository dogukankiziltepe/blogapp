import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {userLogOut}from '../../redux/actions/userActions'


class Logout extends Component {
    componentDidMount() {
        this.props.userLogOut();
    }
    
    render() {
        if(this.props.isAuthenticated === false){
            return(
                <Redirect to="/" />
            )
        }
        return (
            <div>
                Çıkış yapılırken sorun yaşandı!
            </div>
        )
    }
}

function MapStateToProps(state){
    return {
        isAuthenticated : state.userReducer.isAuthenticated,
    }
    
}

const MapDispatchToProps = {
        userLogOut
}

export default connect(MapStateToProps, MapDispatchToProps)(Logout)
