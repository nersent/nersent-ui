import React from 'react'

import RaisedButton from '../../../material-react/components/RaisedButton'
import FlatButton from '../../../material-react/components/FlatButton'

import Checkbox from '../../../material-react/components/Checkbox'

export default class App extends React.Component {
  render () {
    const onCheck = (flag, item) => {
      console.log(flag, item)
    }

    return (
      <div className='app-container'>
        <RaisedButton>
          raised button
        </RaisedButton>
        <FlatButton>
          flat button
        </FlatButton>
        <br />
        <Checkbox onCheck={onCheck}>
          Checkbox
        </Checkbox>
      </div>
    )
  }
}
