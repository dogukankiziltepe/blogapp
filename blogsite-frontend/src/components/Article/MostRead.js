import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'

class MostRead extends Component {
    
    render() {
        return (
            <div className = "col-3 d-inline-block align-top shadow-sm p-3 mb-5 bg-white rounded border">
                <h4>Kategoriler</h4>
                <hr/>
                <ul className="list-group">
                {this.props.categories ?this.props.categories.map(item => (<li className="list-group-item" key= {item.categoryId} ><Link key={item.id} className="text-body text-decoration-none" to={"/category/"+item.categoryName}>{item.categoryName}</Link></li>) ) :null}
                </ul>
                <br/>
                <h4>En Çok Okunanlar</h4>
                <hr/>
                <ul className="list-group">
                {this.props.articles ? this.props.articles.slice(0, 4).map(item => (<li className= "list-group-item" key={item.id}><Link key={item.id} className="text-body text-decoration-none" to={"/Article/"+item.id} >{item.title}</Link></li>)):null}
                </ul>
            </div>
        )
    }
}

function MapStateToProps(state){
    return {
        articles : state.articleReducer.articles,
        categories : state.articleReducer.categories
    }
    
}


export default connect(MapStateToProps)(MostRead)
