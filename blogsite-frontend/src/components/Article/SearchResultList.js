import React, { Component } from 'react'
import MostRead from './MostRead'
import ArticleList from "./ArticleList"

export default class SearchResultList extends Component {
    render() {
        return (
            <div>
                <ArticleList set = "Search"/>
                <MostRead/>
            </div>
        )
    }
}