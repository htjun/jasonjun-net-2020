import React from 'react'

import Layout from 'components/Layout'
import SEO from 'components/seo'

class About extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <SEO title="About" />
        <h1>About</h1>
        <p>Nothing much.</p>
      </Layout>
    )
  }
}

export default About
