import React from 'react'
import PropTypes from 'prop-types'

import Carousel from '../common/Carousel'

const MainImg = props => {
  const { img } = props

  const CarouselArray = imgs => {
    const result = []
    imgs.forEach((item, index) => {
      result.push({ item: <img src={item} alt='' />, id: `mainImg${index}` })
    })
    return result
  }

  return (
    <div className='mt-nav'>
      <Carousel
        CarouselArray={CarouselArray(img)}
        indicatorClass='indicator-btn'
        indicatorDistance='0rem'
      />
    </div>
  )
}

MainImg.propTypes = {
  img: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default MainImg
