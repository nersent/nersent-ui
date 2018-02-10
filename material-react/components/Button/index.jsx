import React from 'react'

import Ripple from '../Ripple'
import Foreground from '../../utils/foreground'

export default class Button extends React.Component {
  render () {
    const {
      background,
      foreground,
      ripple
    } = this.props

    const foregroundColor = Foreground.get(foreground)

    const style = {
      backgroundColor: background,
      color: foregroundColor
    }

    return (
      <div className='material-button' style={style}>
        {this.props.children}
        <Ripple color={foregroundColor} options={ripple} />
      </div>
    )
  }
}