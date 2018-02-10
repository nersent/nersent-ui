import React from 'react'

import Button from '../../../material-react/components/Button'

export default class App extends React.Component {
  render () {
    return (
      <div className='app-container'>
        <Button  background='transparent' foreground='#3F51B5' shadow={false}>
          button
        </Button>
      </div>
    )
  }
}
