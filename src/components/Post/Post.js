import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import PostContent from './PostContent'
import '../../scss/post.scss'
import WithErrorBoundary from '../Error/WithErrorBoundary'

const PostContentWithError = WithErrorBoundary(PostContent)

const Post = props => {
  const { Img, data } = props

  return (
    <div className='mt-nav'>
      <div
        className='py-3 post-h1'
        style={{ backgroundImage: `url(${Img.post.img})` }}
      >
        <div className='container'>
          <div className='d-flex justify-content-end text-light'>
            <span className='badge badge-primary p-2 contact-title-button'>
              <FontAwesomeIcon icon={faThumbsUp} size='1x' />
              <span className='px-1'>讚</span>
              <span>15</span>
            </span>
            <span className='badge badge-primary p-2 contact-title-button'>
              分享
            </span>
          </div>
          <div className='d-flex justify-content-center mb-4'>
            <Link to='/' className='text-decoration-none text-light'>
              首頁
            </Link>
            <span className='text-light mx-1'>{'>'}</span>
            <Link to='/' className='text-decoration-none text-light'>
              最新消息
            </Link>
          </div>
          <h1 className='text-center text-light mb-4 font-weight-bold'>
            {data.post.title}
          </h1>
          <div className='d-flex justify-content-center'>
            <span className='px-5' style={{ border: 'solid #fff 2px' }} />
          </div>
          <div className='text-light text-center mb-2 mt-3 font-weight-bolder'>
            {data.post.subTitle}
          </div>
        </div>
      </div>
      {/* <ErrorBoundary>
        <PostContent />
      </ErrorBoundary> */}
      <PostContentWithError />
    </div>
  )
}

Post.propTypes = {
  Img: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Post
