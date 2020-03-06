import { useState, useEffect } from 'react'

import constants from '../data/constants'

const useFetchData = (initialValue = []) => {
  const { api } = constants
  const [fetchData, setFetchData] = useState(initialValue)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(api)
      .then(response => {
        return response.json()
      })
      .then(json => {
        setFetchData(json)
        if (error) {
          setError(null)
        }
      })
      .catch(err => {
        setError(err)
        setError(() => {
          throw new Error(err)
        })
      })
  }, [])

  return { fetchData, error }
}

export default useFetchData
