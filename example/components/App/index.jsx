import React from 'react'

import RaisedButton from '../../../material-react/components/RaisedButton'
import FlatButton from '../../../material-react/components/FlatButton'

export default class App extends React.Component {
  render () {
    return (
      <div className='app-container'>
        <RaisedButton>
          raised button
        </RaisedButton>
        <FlatButton>
          flat button
        </FlatButton>
      </div>
    )
  }
}
