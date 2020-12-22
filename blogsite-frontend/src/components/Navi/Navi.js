import React, { Component } from 'react'
import { connect } from 'react-redux'
import Search from './Search'
import {userLogOut}from '../../redux/actions/userActions'
import {Link} from "react-router-dom";

class Navi extends Component {
  

    render() {
        return (
            <div>
                 <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-5 bg-white rounded">
                    <div className="container-fluid">
                      <Link className="navbar-brand" to="/">Blog App</Link>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <Link to="/" className="nav-link active">Ana Sayfa</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link">Yazarlar</Link>
                          </li>
                          {this.props.isAuthenticated === true?(
                          <li>
                              <Link to="/addarticle" className="nav-link">Yazı Ekle</Link>
                          </li>):null}
                          {this.props.isAuthenticated ? (<li className="nav-item">
                            {this.props.userViewModel.role === "Editör"? (<Link to = "/EditArticles" className="nav-link" >Yazıları Düzenle</Link>):null}
                          </li>):null}
                        </ul>
                    <form className="d-flex mr-1 nav justify-content">
                    <Search/>
                    </form>
                    
                    {this.props.isAuthenticated === true ? (
                      <ul className="navbar-nav">
                        <li className="nav-item d-inline-block ml-1">
                              <Link to="/editprofile" className="nav-link">Hoş geldin {this.props.userViewModel.userName} </Link>
                        </li>
                        <li className="nav-item d-inline-block ml-3">
                        <Link to="/logout" className="nav-link">Çıkış Yap</Link>
                        </li>
                      </ul>
                    ):(
                      <ul className="navbar-nav">
                        <li className="nav-item d-inline-block ml-1">
                            <Link to="/login" className="nav-link">Giriş Yap</Link>
                        </li>
                        <li className="nav-item d-inline-block ml-1">
                            <Link to="/Signin" className="nav-link">Kayıt Ol</Link>
                        </li>
                      </ul>
                    )
                    }
                  </div>
                </div>
              </nav>
            </div>
        )
    }
}

function MapStateToProps(state){
  return {
    userViewModel : state.userReducer.UserViewModel,
    isAuthenticated: state.userReducer.isAuthenticated }
}

const MapDispatchToProps = {
  userLogOut
}

export default connect(MapStateToProps,MapDispatchToProps)(Navi)