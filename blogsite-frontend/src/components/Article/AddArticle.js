import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addArticle, GetAllCategories} from '../../redux/actions/articleActions'

class AddArticle extends Component {
    state = {
        Title : "",
        Content: "",
        Category: ""
    }
    componentDidMount(){
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
                {this.props.article ? (<div>Yazı Eklendi</div>):null}
                <input name={"Title"} onChange={this.onChange} />
                <textarea name={"Content"} onChange={this.onChange} />
                <select class="form-select" defaultValue={4} aria-label="Default select example" onChange={this.onChange} name= {"Category"} >
                <option selected>Kategori Seçiniz</option>
                {this.props.categories? this.props.categories.map(item => { return (<option key={item.categoryID} name={"Category"} onClick={this.onChange} value={item.categoryID}>{item.categoryName}</option>)}): null}
                </select>
                <button onClick={() => this.props.addArticle(this.state.Content,this.state.Title, this.state.Category)}>Gönder</button>
            </div>
        )
    }
}

function MapStateToProps(state){
    return {article: state.article,
        categories : state.articleReducer.categories
    }
}

const MapDispatchToProps = {
    addArticle,
    GetAllCategories
}

export default connect(MapStateToProps, MapDispatchToProps)(AddArticle)
