import React, { Component } from 'react'
import {Link} from "react-router-dom"

export default class ArticleCart extends Component {

    render() {
        return (
            <div key = {this.props.categoryName}>
                <h2>{this.props.Title}</h2>
                <hr/>
                <p>{this.props.ShortContent}...<Link to={"/Article/"+this.props.ID}>Devamı</Link></p>
                <h6>Yazar: <Link className="text-body text-decoration-none" to = {"/UserPage/"+this.props.UserName}>{this.props.UserName}</Link></h6>
                <h6>Kategori: <Link className="text-body text-decoration-none"  to={"/category/"+this.props.categoryName}>{this.props.categoryName}</Link></h6>
                <hr/>
            </div>
        )
    }
}
