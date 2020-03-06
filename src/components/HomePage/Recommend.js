import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import useWindowSize from '../../hooks/useWindowSize'
import constants from '../../data/constants'
import Carousel from '../common/Carousel'

const Recommend = props => {
  const { data, img } = props
  const { width } = useWindowSize()

  const CarouselArray = datas => {
    const result = []
    datas.text.forEach((item, index) => {
      result.push({
        item: (
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-sm-2 col-4 d-flex justify-content-end m-0'>
                <img src={img[index]} className='recommend-img' alt='' />
              </div>
              <div className='col-sm-8 col-7 text-left'>
                <div
                  className={classNames(
                    'mb-3',
                    {
                      'pr-5': width > constants.breakpoint.sm
                    },
                    {
                      'pr-3': width > constants.breakpoint.sm
                    }
                  )}
                >
                  {item.content}
                </div>
                <div
                  className='text-danger font-weight-bold'
                  style={{ fontSize: '150%' }}
                >
                  {item.name}
                </div>
                <div>{item.job}</div>
              </div>
            </div>
          </div>
          // </div>
        ),
        id: `recommend${index}`
      })
    })
    return result
  }

  return (
    <div className='bg-light py-5'>
      <div className='container'>
        <h3 className='text-center mt-5 mb-4'>{data.title}</h3>
        <div className='d-flex justify-content-center mb-5'>
          <span className='px-5' style={{ border: 'solid #dc3545 2px' }} />
        </div>
      </div>
      <Carousel
        CarouselArray={CarouselArray(data)}
        indicatorClass='indicator-btn-recommend'
        indicatorDistance='6rem'
      />
    </div>
  )
}

Recommend.propTypes = {
  img: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Recommend
