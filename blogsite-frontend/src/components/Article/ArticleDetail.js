import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class ArticleDetail extends Component {
    
    render() {
        return (
            <div className = "col-8 d-inline-block shadow-sm p-3 mb-5 bg-white rounded border ">
                
                {this.props.article ? (<div >
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to={"/category/"+this.props.article.categoryName}>{this.props.article.categoryName}</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">{this.props.article.title}</li>
                </ol>
                </nav>
                    <h1>{this.props.article.title}</h1>
                    <p className="text-start">{this.props.article.content}</p>
                    <p>Yazar : <Link className="text-body text-decoration-none" to = {"/UserPage/"+this.props.article.userName}>{this.props.article.userName}</Link></p>
                    </div>
                ):null}
                
            
            </div>
        )
    }
}

function MapStateToProps(state){
    return {
        article : state.articleReducer.article
        
    }
    
}

export default connect(MapStateToProps)(ArticleDetail)
