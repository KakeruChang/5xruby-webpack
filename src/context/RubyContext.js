import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const RubyContext = createContext()

// reducer
export const UPDATE_POST = 'UPDATE_POST'
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_POST:
      return action.postData
    default:
      return state
  }
}

export const Ruby = props => {
  const { children } = props
  const [postData, dispatch] = useReducer(reducer, [])

  return (
    <RubyContext.Provider value={{ postData, dispatch }}>
      {children}
    </RubyContext.Provider>
  )
}

Ruby.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired
}
