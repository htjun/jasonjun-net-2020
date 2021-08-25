import React from 'react'
import { Link } from 'gatsby'
import Layout from 'components/Layout'
import styled, { css } from 'styled-components'
import * as style from 'styles/style'


const AboutPage = props => {
  const {pageContext } = props
  return (
    <Layout location={props.location} pageTitle="About">
      About
    </Layout>
  )
}

export default AboutPage
