import React, { Component } from 'react'
import { connect } from 'react-redux'
import {GetArticleWithID,EditArticles, GetAllCategories} from '../../redux/actions/articleActions'

class EditArticle extends Component {
    state = {
        title : "",
        content : "",
        id : this.props.match.params.id
    }
    componentDidMount(){
        this.props.GetArticleWithID(this.state.id)
        this.props.GetAllCategories();
    }

    onChange = (e) =>  {
        const value = e.target.value
        const name = e.target.name
        this.setState({
            [name]:value
    })}
    render() {
        
        return (
            <div>
                {this.props.article? (<div>
                    <input name={"Title"} onChange={this.onChange} value = {this.props.article.title} />
                    <textarea name={"Content"} onChange={this.onChange} value = {this.props.article.content} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    <select class="form-select" aria-label="Default select example" onChange={this.onChange} name= {"Category"} >
                    <option selected>Kategori Seçiniz</option>
                    {this.props.categories? this.props.categories.map(item => { return (<option key={item.categoryID} name={"Category"} onClick={this.onChange} value={item.categoryID}>{item.categoryName}</option>)}): null}
                    </select>
                    <button onClick={() => this.props.EditArticles(this.state.Content,this.state.Title, this.state.id)}>Gönder</button>
                    </div>
                ):null}
            </div>
        )
    }
}

function MapStateToProps(state){
    return {
        article : state.articleReducer.article,
        categories : state.articleReducer.categories
    }
    
}

const MapDispatchToProps = {
        GetArticleWithID,
        EditArticles,
        GetAllCategories
}

export default connect(MapStateToProps, MapDispatchToProps)(EditArticle)