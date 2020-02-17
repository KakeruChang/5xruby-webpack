import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Pagination = props => {
  const { dataLength, page, setPage } = props
  const allPage =
    dataLength % 4 === 0
      ? Math.floor(dataLength / 4)
      : Math.floor(dataLength / 4) + 1

  const goToFirst = () => {
    setPage(1)
  }
  const goToFinal = () => {
    setPage(allPage)
  }
  const goToThePage = thePage => {
    setPage(thePage)
  }
  const goToNext = () => {
    if (page !== allPage) {
      setPage(page + 1)
    }
  }
  const goToPrev = () => {
    if (page !== 1) {
      setPage(page - 1)
    }
  }

  const pageButton = pages => {
    const buttons = []
    for (let i = 0; i < pages; i += 1) {
      buttons.push(
        <li
          className={classNames('page-item', { active: page === i + 1 })}
          key={i}
        >
          <button
            type='button'
            className='page-link'
            onClick={() => goToThePage(i + 1)}
          >
            {i + 1}
          </button>
        </li>
      )
    }
    return buttons
  }

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination justify-content-center'>
        <li className={classNames('page-item', { disabled: page === 1 })}>
          <button type='button' className='page-link' onClick={goToFirst}>
            首頁
          </button>
        </li>
        <li className={classNames('page-item', { disabled: page === 1 })}>
          <button type='button' className='page-link' onClick={goToPrev}>
            上一頁
          </button>
        </li>
        {pageButton(allPage)}
        <li className={classNames('page-item', { disabled: page === allPage })}>
          <button type='button' className='page-link' onClick={goToNext}>
            下一頁
          </button>
        </li>
        <li className={classNames('page-item', { disabled: page === allPage })}>
          <button type='button' className='page-link' onClick={goToFinal}>
            末頁
          </button>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  dataLength: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired
}

export default Pagination
