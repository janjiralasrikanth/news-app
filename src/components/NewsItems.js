import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class NewsItems extends Component {
    //de structuring
    render() {
        let { title, description, imgUrl,newsUrl, author, date} = this.props;
        return (
            <div>
                <div className="card" style={{width: "18rem"}}>
                    <img src={imgUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By </small></p>
                        <p className='card-text'><small className='text-muted'>By {author?"Unckown":author } on {date}</small> </p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItems