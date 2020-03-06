import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Carousel = props => {
  const { CarouselArray, indicatorClass, indicatorDistance } = props
  const [isStopped, setIsStopped] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [preIndex, setPreIndex] = useState(CarouselArray.length - 1 || 0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isForced, setIsForced] = useState(false)
  let timer = null

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
      targetPre = CarouselArray.length - 1
    }
    if (targetNext > CarouselArray.length - 1) {
      targetNext = 0
    }

    clearTimeout(timer)
    setActiveIndex(target)
    setPreIndex(targetPre)
    setNextIndex(targetNext)
  }

  const moveToActive = index => {
    let time = 0
    setIsForced(true)
    if (index - activeIndex >= 0) {
      for (let i = activeIndex; i < index + 1; i += 1) {
        setTimeout(() => {
          forceActive(i)
        }, time)
        if (i === index) {
          setTimeout(() => {
            setIsForced(false)
          }, 1000)
        }
        time += 100
      }
    } else {
      for (let i = activeIndex; i > index - 1; i -= 1) {
        setTimeout(() => {
          forceActive(i)
        }, time)
        if (i === index) {
          setTimeout(() => {
            setIsForced(false)
          }, 1000)
        }
        time += 100
      }
    }
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
            className={classNames(indicatorClass, {
              active: i === activeIndex
            })}
            onClick={() => {
              return moveToActive(i)
            }}
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
            { 'carousel-img-force-active': isForced },
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
          key={item.id}
        >
          {/* <img src={item} alt='' /> */}
          {CarouselArray[index].item}
        </div>
      )
    })
  }

  useEffect(() => {
    if (!isStopped) {
      changeActive(CarouselArray.length)
    }
    return () => {
      return clearTimeout(timer)
    }
  }, [activeIndex, isStopped])

  return (
    <div
      className='carousel-wrapper'
      style={{ paddingBottom: indicatorDistance }}
    >
      <div className='carousel-imgs'>{carouselItem(CarouselArray)}</div>
      <ul className='carousel-index'>{indicator(CarouselArray.length)}</ul>
    </div>
  )
}

Carousel.propTypes = {
  CarouselArray: PropTypes.arrayOf(PropTypes.any).isRequired,
  indicatorClass: PropTypes.string.isRequired,
  indicatorDistance: PropTypes.string.isRequired
}

export default Carousel
