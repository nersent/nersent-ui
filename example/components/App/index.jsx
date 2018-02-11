import React from 'react'

import Checkbox from '../../../material-react/components/Checkbox'

export default class App extends React.Component {
  render () {
    const onCheck = (flag, item) => {
      console.log(flag, item)
    }

    return (
      <div className='app-container'>
        <Checkbox onCheck={onCheck} checked={true} >
          Text
        </Checkbox>
      </div>
    )
  }
}
