import React from 'react'

import Ripple from '../../../material-react/components/Ripple'

export default class App extends React.Component {
  render () {
    return (
      <div className='app-container'>
        <div className='test'>
          <Ripple color='#00ff00' />
        </div>
      </div>
    )
  }
}
