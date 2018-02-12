import React from 'react'

import RaisedButton from '../../../material-react/components/RaisedButton'
import FlatButton from '../../../material-react/components/FlatButton'

import Checkbox from '../../../material-react/components/Checkbox'

import RadioButton from '../../../material-react/components/RadioButton'
import RadioButtonsContainer from '../../../material-react/components/RadioButtonsContainer'

export default class App extends React.Component {
  render () {
    const onCheck = (flag, item) => {
      console.log(flag, item)
    }

    return (
      <div className='app-container'>
        <div style={{ display: 'none' }}>
          <RaisedButton>
            raised button
          </RaisedButton>
          <FlatButton>
            flat button
          </FlatButton>
          <br />
          <Checkbox onCheck={onCheck} />
        </div>
        <RadioButtonsContainer>
          <RadioButton toggled>First item</RadioButton>
          <RadioButton>Second item</RadioButton>
          <RadioButton>Third item</RadioButton>
        </RadioButtonsContainer>
      </div>
    )
  }
}