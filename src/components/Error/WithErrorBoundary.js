import React from 'react'

import ErrorBoundary from './ErrorBoundary'

const WithErrorBoundary = Component => {
  return () => {
    return (
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    )
  }
}

export default WithErrorBoundary
