import React from 'react'

import { DisplayBox, Number, Text } from './components/display'

const Display = props => (
  <DisplayBox>
    <Number>{ props.counter }</Number>
    <Text>{ props.text }</Text>
  </DisplayBox>
)

export default Display
