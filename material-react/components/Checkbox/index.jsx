import React from 'react'

import Ripple from '../Ripple'

import ClassManager from '../../utils/class'

export default class Checkbox extends React.Component {
  constructor () {
    super()

    this.state = {
      checked: false,
      borderColor: false,
      borderWidth: false,
      scale: false
    }
  }

  check (flag = !this.state.checked) {
    const onCheck = this.props.onCheck
    if (typeof onCheck === 'function') onCheck(flag, this)

    if (flag) {
      this.setState({
        borderColor: true
      })

      setTimeout(() => {
        this.setState({
          borderWidth: true
        })

        setTimeout(() => {
          this.setState({
            checked: true
          })
        }, 200)
      }, 100) 
    } else {
      this.setState({
        borderColor: false
      })

      setTimeout(() => {
        this.setState({
          scale: true
        })

        setTimeout(() => {
          this.setState({
            borderWidth: false
          })

          setTimeout(() => {
            this.setState({
              checked: false,
              scale: false
            })
          }, 100)
        }, 200)
      }, 100)
    }
  }

  render () {
    const {
      color,
      offColor,
      ripple,
      className,
      disabled,
      darkTheme
    } = this.props

    const checked = this.state.checked

    const borderStyle = {
      borderWidth: !this.state.borderWidth ? 2 : this.root.offsetWidth / 2,
      borderColor: this.state.borderColor ? color : offColor
    }

    const rippleColor = checked ? color : offColor

    const rootClass = ClassManager.get('material-checkbox', [
      className,
      checked ? 'checked' : ''
    ])

    const iconStyle = {
      transform: `scale(${!this.state.scale ? 1 : 0.1})`
    }

    const style = {
      transform: `scale(${this.state.borderWidth && !checked || !this.state.borderColor && checked ? 0.9 : 1})`
    }

    return (
      <div className={rootClass} ref={(r) => this.root = r} style={style} onClick={() => { this.check() }}>
        <div className='checkbox-border' style={borderStyle} />
        <div className='checkbox-icon' style={iconStyle} />
        <Ripple color={rippleColor} center={true} />
      </div>
    )
  }
}

Checkbox.defaultProps = {
  color: '#3F51B5',
  offColor: '#757575',
  disabled: false,
  darkTheme: false
}