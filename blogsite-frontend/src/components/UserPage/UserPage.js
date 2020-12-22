import React, { Component } from 'react'
import { connect } from 'react-redux'
import {GetUserArticles} from '../../redux/actions/articleActions'
import ArticleList from '../Article/ArticleList'
import UserCart from './UserCart'

class UserPage extends Component {
    state = {
        currentPage : 1,
        maxItemsPerPage: 2,
    }
    componentDidMount() {
        this.props.GetUserArticles(this.props.match.params.username)
    }
    
    render() {
        console.log(this.props.userarticles)
        return (
            <div className = "container">
                <ArticleList set ="UserPage" username={this.props.match.params.username}/>
                <UserCart username = {this.props.match.params.username}/> 
            </div>
        )
    }
}

    
 const MapDispatchToProps = {
    GetUserArticles
}

export default connect(null,MapDispatchToProps)(UserPage)