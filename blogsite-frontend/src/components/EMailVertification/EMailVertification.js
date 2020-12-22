import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../../redux/actions/userActions'

class EMailVertification extends Component{
    
    state = {
        userViewModel : {id: this.props.match.params.id}
    }
   
    componentDidMount() {
        this.props.actions.EMailVertification(this.state.userViewModel)
    }
    
    
    render() {
        return (
            <div>
                <p>Emailiniz doğrulanmıştır.</p>
            </div>
        )
    }
}


function MapDispatchToProps(dispatch){
    return {actions: {
        EMailVertification: bindActionCreators(userActions.EMailVertification,dispatch)
    }}
}

export default connect(null,MapDispatchToProps)(EMailVertification)
