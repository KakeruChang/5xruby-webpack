import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/js/src/index'
import { renderRoutes } from 'react-router-config'

import routes from './router/routes'
import NavBar from './components/Navbar'
import Footer from './components/Footer'
import data from './data/data.json'
import Img from './data/Img'
import { Ruby } from './context/RubyContext'
import './scss/common.scss'

function App(props) {
  const contentNavbar = data.Navbar
  const { location } = props
  const path = location.pathname

  return (
    <Ruby>
      <div className='App'>
        <NavBar content={contentNavbar} path={path} />
        {renderRoutes(routes, { data, Img })}
        <Footer data={data.footer} img={Img.footerImg} />
      </div>
    </Ruby>
  )
}

App.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired
}

export default withRouter(App)
