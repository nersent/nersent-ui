import React from 'react'

import Foreground from '../../utils/foreground'

export default class Button extends React.Component {
  render () {
    const {
      background,
      foreground
    } = this.props

    const style = {
      backgroundColor: background,
      color: Foreground.get(foreground)
    }

    return (
      <div className='material-button' style={style}>
        button
      </div>
    )
  }
}