import React, { Component } from 'react'
import {GetAllArticles, SearchArticle} from '../../redux/actions/articleActions'
import { connect } from 'react-redux'
import List from './List'

class ArticleList extends Component {
    state = {
        currentPage : 1,
        maxItemsPerPage: 2,
    }

    componentDidMount() {
        if(this.props.set === "home")
        {this.props.GetAllArticles()}
        
    }
    

    changePage(direction) {
        if (direction === 'back') 
            this.setState({
          currentPage: this.state.currentPage - 1
         });
         
        else if (direction === 'next') 
            this.setState({
                currentPage: this.state.currentPage + 1
                });
        }
        
    buttonRender(articles){
        
               return(<div>
                {articles ?
                    (<div>
                        {this.state.currentPage > 1 ?
                            <button className= "left button btn-primary" onClick={() => this.changePage('back')}>Back</button>
                        : null}
                        {this.props.articles.length- 1 >= this.state.currentPage * this.state.maxItemsPerPage ?
                            <button className= "right button btn-primary" onClick={() => this.changePage('next')}>Next</button>
                        : null}
                    </div>) : null}
                    </div>
            )}
    ListRender(){
        let min = (this.state.currentPage * this.state.maxItemsPerPage) - this.state.maxItemsPerPage
        let max = this.state.currentPage * this.state.maxItemsPerPage
        if(this.props.set ==="Search"){
            return(
                <div>
                    <h1>Arama Sonuçları</h1>
                    <hr/>
                    <List min = {min} max = {max} articles = {this.props.searchresult} set = {this.props.set}/>
                    {this.buttonRender(this.props.searchresult)}
                </div>       
            )}
    
            else if(this.props.set ==="UserPage"){
            return(
                <div>
                    <h1>{this.props.username} kullanıcısının yazıları</h1>
                    <hr/>
                    <List min = {min} max = {max} articles = {this.props.userarticles} set = {this.props.set}/>
                    {this.buttonRender(this.props.userarticles)}
            </div>
            )}
        
            else if(this.props.set === "CategoryPage"){
            return(
            <div>
                    <h1>{this.props.categoryName} Yazıları</h1>
                    <hr/>
                    <List min = {min} max = {max} key={this.props.categoryName} articles = {this.props.categoryarticles} set = {this.props.categoryName}/>
                    {this.buttonRender(this.props.categoryarticles)}
            </div>
            )}
            else if(this.props.set === "home"){
            return(
            <div >
                <h1>Yeni Yazılar</h1>
                <hr/>
                <List min = {min} max = {max} articles = {this.props.articles} set = {this.props.set}/>    
                {this.buttonRender(this.props.articles)}
            </div>)
        }
    }    
            
           
    render() {
        return (
        <div className="col-7 d-inline-block shadow-sm p-3 mb-5 bg-white rounded border text-start">
            {this.ListRender()}
        </div>
        )
    }
}

function MapStateToProps(state){
    return {
        articles : state.articleReducer.articles,
        searchresult: state.articleReducer.searchresult,
        userarticles : state.articleReducer.userarticles,
        categoryarticles : state.articleReducer.categoryarticles
    }
    
}

const MapDispatchToProps = {
        GetAllArticles,
        SearchArticle
}

export default connect(MapStateToProps, MapDispatchToProps)(ArticleList)
