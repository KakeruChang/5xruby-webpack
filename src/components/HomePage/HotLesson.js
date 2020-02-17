import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const HotLesson = props => {
  const { data, img } = props

  return (
    <div className='py-5'>
      <div className='container'>
        <h3 className='text-center mt-5 mb-4'>{data.title}</h3>
        <div className='d-flex justify-content-center mb-5'>
          <span className='px-5' style={{ border: 'solid #dc3545 2px' }} />
        </div>
        <div className='row pb-5'>
          {data.content.map((item, index) => {
            return (
              <Link
                to='/#'
                className='col-md-4 col-12 text-decoration-none text-dark mt-3'
                key={item.name}
              >
                <div className='card hot-lesson-item'>
                  <img className='card-img-top' src={img[index]} alt='' />
                  <div className='card-body py-2 px-3 text-left'>
                    <div className='d-flex'>
                      {item.isNew && (
                        <span className='badge badge-warning text-light p-1 mr-1'>
                          新開課
                        </span>
                      )}
                      {item.isRegistering && (
                        <span className='badge badge-danger p-1'>
                          開放報名中
                        </span>
                      )}
                    </div>
                    <h4
                      className='font-weight-bold mt-2 mb-3'
                      style={{ fontSize: 18 }}
                    >
                      {item.name}
                    </h4>
                    <small style={{ color: '#999' }}>
                      講師：{item.teacher}
                    </small>
                    <div className='d-flex mt-2 pt-3 mb-1 border-top'>
                      <small style={{ color: '#999' }}>開課時間</small>
                      <span
                        className='badge p-2 ml-3'
                        style={{ color: '#666', backgroundColor: '#E6E6E6' }}
                      >
                        {item.month}月｜假日班
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className='row justify-content-center my-5 mx-3'>
          <Link
            to='/#'
            className='col-md-3 col-12 py-3 btn btn-danger font-weight-bold'
            style={{ fontSize: 18 }}
          >
            看更多網頁課程
          </Link>
        </div>
      </div>
    </div>
  )
}

HotLesson.propTypes = {
  img: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default HotLesson
