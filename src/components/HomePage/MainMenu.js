import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const MainMenu = props => {
  const { data, img } = props

  return (
    <div className='bg-light py-5'>
      <div className='container'>
        <h3 className='text-center mt-5 mb-4'>{data.title}</h3>
        <div className='d-flex justify-content-center mb-5'>
          <span className='px-5' style={{ border: 'solid #dc3545 2px' }} />
        </div>
        <div className='row'>
          {data.text.map((item, index) => {
            return (
              <Link
                to='/#'
                className='col-md-3 col-12 text-decoration-none text-dark'
                key={item.titleOn}
              >
                <div className='d-flex justify-content-center'>
                  <img src={img[index]} alt='' />
                </div>
                <h3 className='text-center my-3'>
                  <div>{item.titleOn}</div>
                  <div>{item.titleUnder}</div>
                </h3>
                <div className='text-center'>{item.content}</div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

MainMenu.propTypes = {
  img: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default MainMenu
