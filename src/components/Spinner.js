import PropTypes from 'prop-types'
import React, { Component } from 'react'
import loading from './loading.gif'

export default class Spinner extends Component {
//   static propTypes = {second: third}

  render() {
    return (
        <div className='text-center'>
            <img src={loading} alt='loading'/>
        </div>
    )
  }
}
