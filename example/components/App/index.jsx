import React from 'react'

import RaisedButton from '../../../material-react/components/RaisedButton'
import FlatButton from '../../../material-react/components/FlatButton'

import Checkbox from '../../../material-react/components/Checkbox'

import RadioButton from '../../../material-react/components/RadioButton'
import RadioButtonsContainer from '../../../material-react/components/RadioButtonsContainer'

import Switch from '../../../material-react/components/Switch'

export default class App extends React.Component {
  constructor () {
    super()

    this.state = {
      darkTheme: false
    }
  }

  onSwitchToggle = (flag) => {
    this.setState({darkTheme: flag})
  }

  render () {
    const darkTheme = this.state.darkTheme

    const appContainerStyle = {
      backgroundColor: !darkTheme ? '#FAFAFA' : '#333'
    }

    return (
      <div className='app-container' style={appContainerStyle}>
        <div>
          <Switch onToggle={this.onSwitchToggle} darkTheme={darkTheme}>
            Dark Theme
          </Switch>
          <br />
          <br />
          <RaisedButton darkTheme={darkTheme}>
            raised button
          </RaisedButton>
          <FlatButton darkTheme={darkTheme}>
            flat button
          </FlatButton>
          <br />
          <br />
          <Checkbox darkTheme={darkTheme}>
            Text
          </Checkbox>
          <br />
          <br />
          <RadioButtonsContainer darkTheme={darkTheme}>
            <RadioButton toggled>First item</RadioButton>
            <RadioButton>Second item</RadioButton>
            <RadioButton>Third item</RadioButton>
          </RadioButtonsContainer>
        </div>
      </div>
    )
  }
}