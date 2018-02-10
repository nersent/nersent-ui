import React from 'react'

import Button from '../../../material-react/components/Button'

export default class App extends React.Component {
  render () {
    return (
      <div className='app-container'>
        <Button background='#3F51B5' foreground={true} />
      </div>
    )
  }
}
