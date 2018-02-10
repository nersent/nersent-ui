import React from 'react'

import RaisedButton from '../../../material-react/components/RaisedButton'

export default class App extends React.Component {
  render () {
    const onClick = () => {
      console.log('Click!')      
    }

    return (
      <div className='app-container'>
        <RaisedButton background='#2196F3' foreground={true} darkTheme={true} onClick={onClick}>
          button
        </RaisedButton>
      </div>
    )
  }
}
