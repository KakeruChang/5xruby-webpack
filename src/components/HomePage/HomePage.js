import React from 'react'
import PropTypes from 'prop-types'

import Carousel from './Carousel'
import MainMenu from './MainMenu'
import HotLessons from './HotLesson'
import Recommend from './Recommend'
import Showcase from './Showcase'
import '../../scss/home.scss'

const HomePage = props => {
  const { Img, data } = props

  return (
    <>
      <Carousel img={Img.carouselImg} />
      <MainMenu data={data.mainMenu} img={Img.mainMenuImg} />
      <HotLessons data={data.hotLesson} img={Img.hotLessonImg} />
      <Recommend data={data.recommend} img={Img.recommendImg} />
      <Showcase data={data.showcase} img={Img.showcaseImg} />
    </>
  )
}

HomePage.propTypes = {
  Img: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
}

export default HomePage
