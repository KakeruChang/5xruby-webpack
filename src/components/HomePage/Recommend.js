import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import useWindowSize from '../../hooks/useWindowSize'
import constants from '../../data/constants'

const Recommend = props => {
  const { data, img } = props
  const { width } = useWindowSize()
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
            className={classNames('indicator-btn-recommend', {
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
  const carouselItem = datas => {
    return datas.text.map((item, index) => {
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
          key={item.name}
        >
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
    <div className='bg-light py-5'>
      <div className='container'>
        <h3 className='text-center mt-5 mb-4'>{data.title}</h3>
        <div className='d-flex justify-content-center mb-5'>
          <span className='px-5' style={{ border: 'solid #dc3545 2px' }} />
        </div>
      </div>
      <div className='carousel-wrapper' style={{ paddingBottom: '6rem' }}>
        <div className='carousel-imgs'>{carouselItem(data)}</div>
        <ul className='carousel-index'>{indicator(img.length)}</ul>
      </div>
    </div>
  )
}

Recommend.propTypes = {
  img: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Recommend
