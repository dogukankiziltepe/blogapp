import React, { Component } from 'react'
import ArticleCart from './ArticleCart'

export default class List extends Component {
    state = {
        set : ""
    }

    render() {

        return (
            <div>
                 {this.props.articles ? this.props.articles
                                    .slice(this.props.min,this.props.max)
                                    .map(article => 
                                    (<ArticleCart categoryName= {article.categoryName} UserName = {article.userName} key ={article.id} ID = {article.id} Title = {article.title} ShortContent = {article.shortContent} />)
                                    ):null}
            </div>
        )
    }
}

