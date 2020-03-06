import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'

import ContactModal from './ContactModal'
// import ContactReactModal from './ContactReactModal'
import '../../scss/contact.scss'

const Contact = props => {
  const { Img, data } = props
  const [info, setInfo] = useState({
    name: { value: '', isEmpty: false },
    email: { value: '', isEmpty: false },
    phone: { value: '', isEmpty: false },
    type: { value: '', isEmpty: false },
    content: { value: '', isEmpty: false }
  })
  const [isShow, setIsShow] = useState(false)

  const checkEmail = email => {
    if (email.indexOf('@') === -1) {
      return true
    }
    return false
  }

  const checkPhone = phone => {
    const rule1 = /^[0]{1}\d{1}[- ](\d{8}|\d{7})$/.test(phone)
    const rule2 = /^[0]{1}[9]{1}\d{2}[- ]\d{6}$/.test(phone)
    if (!rule1 && !rule2) {
      return true
    }
    return false
  }

  const checkInput = event => {
    const { name, value, required } = event.target
    const origin = { ...info }

    if (value) {
      if (name === 'email') {
        if (checkEmail(value)) {
          origin[name].isEmpty = 'email格式錯誤'
        } else if (origin[name].isEmpty) {
          origin[name].isEmpty = false
        }
      } else if (name === 'phone') {
        if (checkPhone(value)) {
          origin[name].isEmpty = '電話格式必須是09xx-xxxxxx 或是 0x-xxxx-xxxx'
        } else if (origin[name].isEmpty) {
          origin[name].isEmpty = false
        }
      } else if (origin[name].isEmpty) {
        origin[name].isEmpty = false
      }

      origin[name].value = value
      setInfo(origin)
    } else if (required) {
      origin[name].isEmpty = true
      origin[name].value = value
      setInfo(origin)
    }
  }

  const openModal = event => {
    event.preventDefault()
    const origin = { ...info }
    let isAnyEmpty = false

    const checkList = ['name', 'email', 'phone', 'type', 'content']
    checkList.forEach(item => {
      if (!info[item].value) {
        origin[item].isEmpty = true
        isAnyEmpty = true
      } else {
        if (item === 'email') {
          if (checkEmail(origin[item].value)) {
            isAnyEmpty = true
          }
        }
        if (item === 'phone') {
          if (checkPhone(origin[item].value)) {
            isAnyEmpty = true
          }
        }
      }
    })

    if (!isAnyEmpty) {
      setIsShow(true)
    } else {
      setInfo(origin)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='mt-nav mb-5 pb-5'>
      <div className='bg-danger py-3'>
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
              聯絡我們
            </Link>
          </div>
          <h1 className='text-center text-light mb-4 font-weight-bold'>
            {data.contact.title}
          </h1>
          <div className='d-flex justify-content-center mb-3'>
            <span className='px-5' style={{ border: 'solid #fff 2px' }} />
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-6 col-12 text-left'>
            <h3 style={{ fontSize: 24 }}>{data.contact.name}</h3>
            <div className='mb-3'>{data.contact.address}</div>
            <div className='row mb-3'>
              {data.contact.content.map(item => {
                return (
                  <div className='col-6' key={item.text}>
                    {item.type}：
                    {item.isLink ? (
                      <Link to='/' className='text-danger'>
                        {item.text}
                      </Link>
                    ) : (
                      item.text
                    )}
                  </div>
                )
              })}
            </div>
            <img className='img-fluid' src={Img.contact.map} alt='' />
          </div>
          <div className='col-md-6 col-12'>
            <form>
              <p className='text-left'>{data.contact.formTitle}</p>
              <div className='form-group'>
                <input
                  type='text'
                  className={classNames('form-control', {
                    'is-invalid': info.name.isEmpty
                  })}
                  id='exampleFormControlInputName'
                  name='name'
                  value={info.name.value}
                  onChange={checkInput}
                  onBlur={checkInput}
                  placeholder='名字'
                  required
                />
              </div>
              <div className='form-group'>
                <input
                  type='email'
                  className={classNames('form-control', {
                    'is-invalid': info.email.isEmpty
                  })}
                  id='exampleFormControlInputEmail'
                  name='email'
                  value={info.email.value}
                  onChange={checkInput}
                  onBlur={checkInput}
                  placeholder='信箱'
                  required
                />
                {info.email.isEmpty && (
                  <span className='text-danger'>{info.email.isEmpty}</span>
                )}
              </div>
              <div className='form-group'>
                <input
                  type='text'
                  className={classNames('form-control', {
                    'is-invalid': info.phone.isEmpty
                  })}
                  id='exampleFormControlInputTel'
                  name='phone'
                  value={info.phone.value}
                  onChange={checkInput}
                  onBlur={checkInput}
                  placeholder='電話'
                  required
                />
                {info.phone.isEmpty && (
                  <span className='text-danger'>{info.phone.isEmpty}</span>
                )}
              </div>
              <div className='form-group'>
                <select
                  className={classNames('form-control', {
                    'is-invalid': info.type.isEmpty
                  })}
                  defaultValue='default'
                  name='type'
                  onBlur={checkInput}
                  onChange={checkInput}
                  id='exampleFormControlSelect1'
                  required
                >
                  {data.contact.choice.map(item => {
                    if (item.value) {
                      return (
                        <option value={item.value} key={item.text}>
                          {item.text}
                        </option>
                      )
                    }
                    return (
                      <option value='default' disabled key={item.text}>
                        {item.text}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className='form-group'>
                <textarea
                  className={classNames('form-control', {
                    'is-invalid': info.content.isEmpty
                  })}
                  id='exampleFormControlTextarea1'
                  rows='5'
                  name='content'
                  value={info.content.value}
                  onChange={checkInput}
                  onBlur={checkInput}
                  placeholder='留下你的訊息'
                  required
                />
              </div>
              <div className='row mb-3'>
                <div className='col-md-8 col-12'>
                  <button type='button' className='rounded'>
                    <img
                      className='img-fluid'
                      src={Img.contact.button}
                      alt=''
                    />
                  </button>
                </div>
              </div>
              <button
                type='submit'
                className='btn btn-danger w-100 text-center py-3'
                style={{ fontSize: 18 }}
                onClick={openModal}
              >
                送出
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* <ContactReactModal info={info} isShow={isShow} setIsShow={setIsShow} /> */}
      <ContactModal info={info} isShow={isShow} setIsShow={setIsShow} />
    </div>
  )
}

Contact.propTypes = {
  Img: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default Contact
