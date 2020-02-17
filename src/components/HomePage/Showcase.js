import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'

const Showcase = props => {
  const { data, img } = props

  const combineString = array => {
    const result = []

    array.forEach(string => {
      if (!string.isLink) {
        result.push(string.text)
      } else {
        result.push(
          <Link
            to='/'
            className='text-danger text-decoration-none'
            key={string.text}
          >
            {string.text}
          </Link>
        )
      }
    })

    return result
  }

  return (
    <div className='py-5'>
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
                className='col-lg-4 col-md-6 col-12 text-decoration-none mt-3'
                style={{ color: '#666' }}
                key={item.title}
              >
                <div className='card h-100'>
                  <img className='card-img-top' src={img[index]} alt='' />
                  <div className='card-body px-3 text-left'>
                    <h4
                      className='font-weight-bold mb-2'
                      style={{ fontSize: 18 }}
                    >
                      {item.title}
                    </h4>
                    <p className='d-flex pt-2 mb-4'>{item.content}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
        <div className='d-flex justify-content-end my-3 font-weight-bold'>
          <Link to='/#' className='text-danger'>
            ...更多案例
          </Link>
        </div>
        <h3 className='text-center'>{data.explain.title}</h3>
        <div className='row justify-content-center'>
          <p
            className='col-lg-6 col-12 my-4'
            style={{ fontSize: 18, lineHeight: '38px' }}
          >
            {combineString(data.explain.content)}
          </p>
          <div className='col-12 d-flex justify-content-center'>
            <Link to='/' className='showcase-brand'>
              <FontAwesomeIcon icon={faFacebookF} size='2x' />
            </Link>
            <Link to='/' className='showcase-brand'>
              <FontAwesomeIcon icon={faTwitter} size='2x' />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

Showcase.propTypes = {
  img: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Showcase
