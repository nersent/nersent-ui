import React from 'react'

import RadioButton from '../RadioButton'

export default class RadioButtonsContainer extends React.Component {
  constructor () {
    super()

    this.radioButtons = []
  }

  componentDidMount () {
    setTimeout(() => {
      for (var i = 0; i < this.radioButtons.length; i++) {
        if (this.radioButtons[i].props.toggled) {
          this.toggle(this.radioButtons[i], true)
        }
      }
    })
  }

  onClick = (radiobutton) => {
    this.toggle(radiobutton)
  }

  toggle (radiobutton, fromProps = false) {
    if (this.latest === radiobutton || radiobutton.props.disabled && !fromProps) return

    if (this.latest != null) this.latest.toggle(false)
    radiobutton.toggle(true)

    this.latest = radiobutton

    const onToggle = this.props.onToggle

    if (typeof onToggle === 'function') {
      onToggle(this.radioButtons.indexOf(radiobutton), radiobutton, this.latest, this, fromProps)
    } 
  }

  render () {
    this.radioButtons = []

    return (
      <div className='radio-buttons-container'>
        {
          React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
              onClick: this.onClick, ref: (r) => { this.radioButtons.push(r)},
              darkTheme: this.props.darkTheme
            })
          })
        }
      </div>
    )
  }
}