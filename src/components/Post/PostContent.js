import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

import Pagination from '../common/Pagination'
import useFetchData from '../../hooks/useFetchData'
import { RubyContext, UPDATE_POST } from '../../context/RubyContext'

const PostContent = () => {
  const [dataDisplay, setDataDisplay] = useState([])
  const { fetchData } = useFetchData()
  const [page, setPage] = useState(1)
  const { dispatch, postData } = useContext(RubyContext)

  useEffect(() => {
    dispatch({ type: UPDATE_POST, postData: fetchData })
  }, [fetchData])

  useEffect(() => {
    const start = (page - 1) * 4
    const end = page * 4
    setDataDisplay(postData.slice(start, end))
  }, [page, postData])

  return (
    <>
      <div className='container'>
        {dataDisplay.map(item => {
          return (
            <div className='row bg-light text-left my-5' key={item.id}>
              <div className='col-md-6 col-12'>
                <div
                  className='post-img'
                  style={{ backgroundImage: `url(${item.img})` }}
                />
              </div>
              <div className='col-md-6 col-12 py-3 pr-3 d-flex flex-column'>
                <small className='d-block text-grey'>{item.date}</small>
                <h3 className='my-3'>
                  <Link to='/' className='post-title'>
                    {item.title}
                  </Link>
                </h3>
                <p>{item.content}</p>
                <div className='d-flex justify-content-between mt-auto'>
                  <small className='text-grey'>By {item.author}</small>
                  <button type='button' className='btn btn-outline-danger px-4'>
                    看更多
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='my-5 py-5'>
        <Pagination
          dataLength={postData.length}
          page={page}
          setPage={setPage}
        />
      </div>
    </>
  )
}

export default PostContent
