import React, { Component } from 'react'

export default class UserCart extends Component {
    render() {
        return (
            <div className="card col-3 d-inline-block align-top shadow-sm p-3 mb-5 bg-white rounded border">
            <img src="..." className="card-img-top" alt="..."/>
            <div className="card-body">
              <p className="card-text">Kullanıcı Adı: {this.props.username}</p>
            </div>
          </div>
        )
    }
}
