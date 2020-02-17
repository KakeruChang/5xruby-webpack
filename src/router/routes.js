import React from 'react'
import { Redirect } from 'react-router'
import HomePage from '../components/HomePage/HomePage'
import Contact from '../components/Contact/Contact'
import Post from '../components/Post/Post'
import Online from '../components/EmptyPages/Online'
import ASTROCamp from '../components/EmptyPages/ASTROCamp'
import Short from '../components/EmptyPages/Short'
import Dev from '../components/EmptyPages/Dev'
import Training from '../components/EmptyPages/Training'
import Space from '../components/EmptyPages/Space'

const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true
  },
  {
    path: '/contacts',
    component: Contact
  },
  { path: '/posts', component: Post },
  {
    path: '/online',
    component: Online
  },
  {
    path: '/astro',
    component: ASTROCamp
  },
  {
    path: '/short',
    component: Short
  },
  {
    path: '/dev',
    component: Dev
  },
  {
    path: '/training',
    component: Training
  },
  {
    path: '/space',
    component: Space
  },
  {
    path: '*',
    exact: true,
    component: () => <Redirect to='/' />
  }
]

export default routes
