import React, { Component } from 'react'
import {GetArticleWithID} from '../../redux/actions/articleActions'
import { connect } from 'react-redux'
import ArticleDetail from './ArticleDetail'
import MostRead from './MostRead'

class ArticleDetailPage extends Component {
    state = {
        id : ""
    }
    componentDidMount(){
        this.setState({
            id : this.props.match.params.id
        })
        this.props.GetArticleWithID(this.props.match.params.id)
    }
    componentDidUpdate(){
        this.props.GetArticleWithID(this.props.match.params.id)
    }
    render() {
        return (
            <div>
                <ArticleDetail />
                <MostRead/>
            </div>
        )
    }
}


const MapDispatchToProps = {
        GetArticleWithID
}

export default connect(null, MapDispatchToProps)(ArticleDetailPage)