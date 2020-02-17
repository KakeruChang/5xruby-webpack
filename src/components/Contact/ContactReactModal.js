import React from 'react'
import PropTypes from 'prop-types'

import Modal from 'react-modal'

Modal.setAppElement('#root')

const ContactReactModal = props => {
  const { info, isShow, setIsShow } = props
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
    }
  }

  function closeTheModal() {
    setIsShow(false)
  }

  return (
    <>
      <Modal
        isOpen={isShow}
        onRequestClose={closeTheModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <div className='modal-header bg-danger'>
          <h5 className='modal-title text-light' id='exampleModalLongTitle'>
            確認資訊
          </h5>
          <button
            type='button'
            className='close'
            aria-label='Close'
            onClick={() => setIsShow(false)}
          >
            <span aria-hidden='true'>&times;</span>
          </button>
        </div>
        <div className='modal-body'>
          <form>
            <div className='form-group'>
              <div className='col-form-label text-left'>名字</div>
              <input
                type='text'
                className='form-control'
                id='recipient-name'
                value={info.name.value}
                disabled
              />
            </div>
            <div className='form-group'>
              <div className='col-form-label text-left'>信箱</div>
              <input
                type='text'
                className='form-control'
                id='recipient-email'
                value={info.email.value}
                disabled
              />
            </div>
            <div className='form-group'>
              <div className='col-form-label text-left'>電話</div>
              <input
                type='text'
                className='form-control'
                id='recipient-phone'
                value={info.phone.value}
                disabled
              />
            </div>
            <div className='form-group'>
              <div className='col-form-label text-left'>種類</div>
              <input
                type='text'
                className='form-control'
                id='recipient-type'
                value={info.type.value}
                disabled
              />
            </div>
            <div className='form-group'>
              <div className='col-form-label text-left'>訊息</div>
              <textarea
                className='form-control'
                id='message-text'
                value={info.content.value}
                disabled
              />
            </div>
          </form>
        </div>
        <div className='modal-footer'>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={() => setIsShow(false)}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  )
}

ContactReactModal.propTypes = {
  info: PropTypes.objectOf(PropTypes.object).isRequired,
  isShow: PropTypes.bool.isRequired,
  setIsShow: PropTypes.func.isRequired
}

export default ContactReactModal
