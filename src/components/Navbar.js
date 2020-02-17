import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGem, faCompass } from '@fortawesome/free-regular-svg-icons'
import classNames from 'classnames'

import Img from '../data/Img'
import constants from '../data/constants'
import useWindowSize from '../hooks/useWindowSize'

const Navbar = props => {
  const { breakpoint } = constants
  const { content, path } = props
  const { width } = useWindowSize()

  return (
    <nav className='navbar navbar-expand-md fixed-top navbar-light bg-light'>
      <Link to='/' className='navbar-brand'>
        <img src={Img.Navbar.img} alt='5xruby' />
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav ml-auto'>
          {content.map(title => {
            return (
              <li
                className={classNames('nav-item', {
                  'px-4': width >= breakpoint.lg
                })}
                key={title.text}
              >
                <Link
                  className={classNames('nav-link', {
                    'text-danger': path === title.link
                  })}
                  to={title.link}
                >
                  {title.img === 'faGem' && (
                    <FontAwesomeIcon icon={faGem} size='1x' />
                  )}
                  {title.img === 'faCompass' && (
                    <FontAwesomeIcon icon={faCompass} size='1x' />
                  )}
                  <span
                    className={classNames({
                      'ml-2': title.img === 'faGem' || title.img === 'faCompass'
                    })}
                  >
                    {title.text}
                  </span>
                  {title.state && (
                    <span className='badge badge-danger p-1 ml-2 nav-item-state  bouncing'>
                      <span>{title.state}</span>
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  path: PropTypes.string.isRequired
}

export default Navbar
