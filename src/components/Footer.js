import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faTwitter,
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

import useWindowSize from '../hooks/useWindowSize'

const Footer = props => {
  const { data, img } = props
  const { width } = useWindowSize()

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className='bg-light py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3 col-12'>
            {img.map((item, index) => {
              return (
                <Link
                  to='/'
                  key={item}
                  className='my-3 text-decoration-none footer-img'
                >
                  <img
                    className={classNames(
                      'img-fluid pb-2 pr-2',
                      {
                        'footer-img-with-text': data.image[index]
                      },
                      { 'w-100': width < 768 && !data.image[index] }
                    )}
                    src={item}
                    alt=''
                  />
                  {data.image[index] && (
                    <span className='my-auto'>{data.image[index]}</span>
                  )}
                </Link>
              )
            })}
          </div>
          <div className='col-md-9 col-12'>
            <div className='row'>
              <div className='col-12 mb-4'>
                {data.link.map(item => {
                  return (
                    <h5 className='footer-link' key={item.text}>
                      <Link to={item.link}>{item.text}</Link>
                    </h5>
                  )
                })}
                <div className='clearfix' />
              </div>
              <div className='col-12'>
                <div className='row'>
                  <div className='col-md-4 col-12 text-left'>
                    <div
                      className='text-danger font-weight-bold'
                      style={{ fontSize: '125%' }}
                    >
                      {data.tel}
                    </div>
                    <div>
                      <small>{data.time}</small>
                    </div>
                    <div className='d-flex justify-content-start'>
                      <Link to='/' className='footer-brand'>
                        <FontAwesomeIcon icon={faFacebookF} size='lg' />
                      </Link>
                      <Link to='/' className='footer-brand'>
                        <FontAwesomeIcon icon={faTwitter} size='lg' />
                      </Link>
                      <Link to='/' className='footer-brand'>
                        <FontAwesomeIcon icon={faGithub} size='lg' />
                      </Link>
                    </div>
                  </div>
                  <div
                    className='col-md-8 col-12 text-left'
                    style={{ lineHeight: '30px' }}
                  >
                    <div>有任何問題？</div>
                    <Link to='/' className='footer-email text-decoration-none'>
                      {data.email}
                    </Link>
                    <div>地址：{data.address}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 text-center mt-5'>
            {data.contact.map(item => {
              return <p key={item}>{item}</p>
            })}
          </div>
        </div>
      </div>
      <button type='button' className='showcase-brand go-top' onClick={goTop}>
        <FontAwesomeIcon icon={faChevronUp} size='lg' />
      </button>
    </footer>
  )
}

Footer.propTypes = {
  img: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Footer
