import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import '../../scss/Carousel.scss'

const Carousel = (props) => {
  const { setTimeout } = window
  const interval = {
    pass: 1000,
    stopped: 5000
  }
  const timer = {
    active: 0,
    inactive: 0
  }
  const { CarouselArray, indicatorClass, indicatorDistance } = props
  const { length } = CarouselArray
  const [active, setActive] = useState(0)
  const [inactive, setInactive] = useState(length - 1)
  const [isStopped, setIsStopped] = useState(false)

  const changeActive = (aim) => {
    timer.active = setTimeout(() => {
      if (active < length - 1) {
        setActive(aim)
        setInactive(active)
      } else {
        setActive(0)
        setInactive(active)
      }
    }, interval.stopped)
    timer.inactive = setTimeout(() => {
      setInactive(null)
    }, interval.pass)
  }

  const stopCarousel = () => {
    if (timer.active) {
      clearTimeout(timer.active)
    }
    setIsStopped(true)
  }

  const continueCarousel = () => {
    setIsStopped(false)
    timer.active = setTimeout(() => {}, interval.stopped)
  }

  const forceActive = (aim) => {
    if (aim !== active) {
      clearTimeout(timer.active)
      clearTimeout(timer.inactive)

      setActive(aim)
      setInactive(active)

      timer.inactive = setTimeout(() => {
        setInactive(null)
      }, interval.pass)
    }
  }

  const indicator = (num) => {
    const indicatorArray = []

    for (let i = 0; i < num; i += 1) {
      indicatorArray.push(
        <li key={i}>
          <span
            className={classNames(indicatorClass, {
              active: i === active
            })}
            onClick={() => {
              return forceActive(i)
            }}
            aria-hidden='true'
          />
        </li>
      )
    }
    return indicatorArray
  }

  useEffect(() => {
    if (!isStopped) {
      changeActive(active + 1)
    }

    return () => {
      if (timer.active) {
        clearTimeout(timer.active)
      }
    }
    // eslint-disable-next-line
  }, [active, isStopped])

  return (
    <div
      className='carousel-wrapper'
      style={{ paddingBottom: indicatorDistance }}
    >
      {/* <div style={styles.wrapper}> */}
      {CarouselArray.map((item, index) => {
        return (
          <div
            className={classNames(
              'carousel-item',
              { active: active === index },
              { inactive: inactive === index }
            )}
            onMouseEnter={stopCarousel}
            onMouseLeave={continueCarousel}
            key={item.id}
          >
            {/* <div style={styles.item} key={`${index * index}`}> */}
            {item.item}
          </div>
        )
      })}
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
