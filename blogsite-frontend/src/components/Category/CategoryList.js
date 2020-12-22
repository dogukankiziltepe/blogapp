import React, { Component } from 'react'
import { connect } from 'react-redux'
import {GetCategoryArticles} from '../../redux/actions/articleActions'
import ArticleList from '../Article/ArticleList'
import MostRead from '../Article/MostRead'

class CategoryList extends Component {
    state={
        categoryName : ""
    }
    componentDidMount() {
        this.setState({
            categoryName: this.props.match.params.categoryName
        })
        this.props.GetCategoryArticles(this.props.match.params.categoryName)
        
    }
    componentDidUpdate() {
        this.props.GetCategoryArticles(this.props.match.params.categoryName)
      }
    
    render() {
        
        return (
            <div key={this.props.match.params.categoryName} className = "container">
                <ArticleList  set ="CategoryPage" categoryName={this.props.match.params.categoryName}/>
                <MostRead/>
            </div>
        )
    }
}

    
const MapDispatchToProps = {
    GetCategoryArticles
}

export default connect(null,MapDispatchToProps)(CategoryList)

