import React, { Component } from 'react'
import {GetNonConfirmedArticles} from '../../redux/actions/articleActions'
import { connect } from 'react-redux'
import {Link} from "react-router-dom"



class EditArticleTable extends Component {
    state = {
        currentPage : 1,
        maxItemsPerPage: 2,
    }

    componentDidMount() {
        this.props.GetNonConfirmedArticles();
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
    

    buttonRender(){
        return(<div>
         {this.props.nonconfirmed ? 
             (<div>
                 {this.state.currentPage > 1 ?
                     <button className= "left button btn-primary" onClick={() => this.changePage('back')}>Back</button>
                 : null}
                 {this.props.nonconfirmed.length- 1 >= this.state.currentPage * this.state.maxItemsPerPage ?
                     <button className= "right button btn-primary" onClick={() => this.changePage('next')}>Next</button>
                 : null}
             </div>) : null}
             </div>)}
    
    render() {
        let min = (this.state.currentPage * this.state.maxItemsPerPage) - this.state.maxItemsPerPage
        let max = this.state.currentPage * this.state.maxItemsPerPage
        return (
            <div className = "container">
                <table className = "table table-striped table-hover table table-bordered border-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Başlık</th>
                        <th>Kullanıcı</th>
                        <th>Düzenle</th>
                    </tr>
                </thead>
                {this.props.nonconfirmed ? this.props.nonconfirmed
                    .slice(min,max)
                    .map(article => 
                    (
                        <tbody>
                            <tr>
                                <th>{article.id}</th>
                                <td>{article.title}</td>
                                <td>{article.userName}</td>
                                <td><Link className= "btn btn-primary" to = {"/EditArticle/"+article.id}>Düzenle</Link></td>
                            </tr>
                        </tbody>
                    )):null}
                
                </table>          
                {this.buttonRender()}     
            </div>
        )
    }
}


function MapStateToProps(state){
    return {
        userViewModel : state.userReducer.UserViewModel,
        nonconfirmed : state.articleReducer.nonconfirmed,
        isAuthenticated : state.userReducer.isAuthenticated,
        error : state.userReducer.Error
    }
    
}

const MapDispatchToProps = {
        GetNonConfirmedArticles
}

export default connect(MapStateToProps, MapDispatchToProps)(EditArticleTable)