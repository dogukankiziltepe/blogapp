import React, { Component } from 'react'
import ArticleList from './Article/ArticleList'
import MostRead from './Article/MostRead'
import {GetAllArticles, GetAllCategories} from '../redux/actions/articleActions'
import { connect } from 'react-redux'

class Home extends Component {
    componentDidMount() {
        this.props.GetAllArticles();
        this.props.GetAllCategories();
    }
    
    render() {
        return (
            <div className = "container  mt-5">
                <ArticleList set="home"/>
                <MostRead />
            </div>
        )
    }
}

const MapDispatchToProps = {
    GetAllArticles,
    GetAllCategories
}

export default connect(null, MapDispatchToProps)(Home)