import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Carousel = props => {
  const { img } = props
  let timer = null
  const [isStopped, setIsStopped] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [preIndex, setPreIndex] = useState(img.length - 1 || 0)
  const [nextIndex, setNextIndex] = useState(1)

  const changeActive = length => {
    let target = 0
    if (activeIndex !== length - 1) {
      target = activeIndex + 1
    }

    let targetPre = target - 1
    let targetNext = target + 1
    if (targetPre < 0) {
      targetPre = length - 1
    }
    if (targetNext > length - 1) {
      targetNext = 0
    }

    timer = setTimeout(() => {
      setActiveIndex(target)
      setPreIndex(targetPre)
      setNextIndex(targetNext)
    }, 5000)
  }

  const forceActive = index => {
    const target = index
    let targetPre = target - 1
    let targetNext = target + 1
    if (targetPre < 0) {
      targetPre = img.length - 1
    }
    if (targetNext > img.length - 1) {
      targetNext = 0
    }

    clearTimeout(timer)
    setActiveIndex(target)
    setPreIndex(targetPre)
    setNextIndex(targetNext)
  }

  const stopCarousel = () => {
    clearTimeout(timer)
    setIsStopped(true)
  }
  const continueCarousel = () => {
    setIsStopped(false)
    timer = setTimeout(() => {
      setActiveIndex(activeIndex)
      setPreIndex(preIndex)
      setNextIndex(nextIndex)
    }, 5000)
  }

  const indicator = num => {
    const indicatorArray = []

    for (let i = 0; i < num; i += 1) {
      indicatorArray.push(
        <li key={i}>
          <span
            className={classNames('indicator-btn', {
              active: i === activeIndex
            })}
            onClick={() => forceActive(i)}
            aria-hidden='true'
          />
        </li>
      )
    }
    return indicatorArray
  }
  const carouselItem = imgs => {
    return imgs.map((item, index) => {
      return (
        <div
          className={classNames(
            'carousel-img',
            {
              active: index === activeIndex
            },
            {
              left: index === preIndex
            },
            {
              right: index === nextIndex
            }
          )}
          onMouseEnter={stopCarousel}
          onMouseLeave={continueCarousel}
          key={item}
        >
          <img src={item} alt='' />
        </div>
      )
    })
  }

  useEffect(() => {
    if (!isStopped) {
      changeActive(img.length)
    }
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isStopped])

  return (
    <div className='mt-nav'>
      <div className='carousel-wrapper'>
        <div className='carousel-imgs'>{carouselItem(img)}</div>
        <ul className='carousel-index'>{indicator(img.length)}</ul>
      </div>
    </div>
  )
}

Carousel.propTypes = {
  img: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
}

export default Carousel
