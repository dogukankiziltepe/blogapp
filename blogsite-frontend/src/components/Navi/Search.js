import React, { Component } from 'react'
import {SearchArticle} from "../../redux/actions/articleActions"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Search extends Component {
    state = {
        searchitem : "",
        search: false
    }


    onchange = (e) => {
        console.log("ss")
        var value = [e.target.value]
        this.setState({
            searchitem : value
        })
    }
    render() {
        console.log(this.state.searchitem)
        return (
            <div className = "navbar-nav">
                <input className="form-control me-2" type = "text" name={"searchitem"} onChange={this.onchange}/>
                <Link className="btn btn-outline-success" to={"/Search/"+this.state.searchitem} onClick = {() => this.props.SearchArticle(this.state.searchitem)}>Search</Link>
            </div>
        )
    }
}

function MapStateToProps(state){
    return {userViewModel: state.UserName}
}

const MapDispatchToProps = {
    SearchArticle
}

export default connect(MapStateToProps, MapDispatchToProps)(Search)
