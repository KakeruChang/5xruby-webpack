import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo })
  }

  render() {
    const { errorInfo, error } = this.state
    const { children } = this.props

    if (errorInfo) {
      // Error path
      return (
        <div className='mt-nav'>
          <div className='container'>
            <div className='alert alert-danger' role='alert'>
              資料載入出現問題請稍後再嘗試
            </div>
            <details className='my-3' style={{ whiteSpace: 'pre-wrap' }}>
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </details>
          </div>
        </div>
      )
    }

    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired
}

export default ErrorBoundary
