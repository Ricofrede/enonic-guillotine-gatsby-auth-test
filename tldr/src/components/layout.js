/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes, { func } from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

  const specialQuery = `
  {
    guillotine {
      query(
        query: "type = 'com.example.myproject:movie'"
        first: 40 
        offset: 0
        contentTypes: "com.example.myproject:movie"
      ){
        displayName
        type
      }
    }
  }
`

  fetch("http://localhost:8080/site/hmdb/draft/hmdb/api2", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "user":"gql",
      "password":"Test1234",
      query: specialQuery,
      variables: {}
    })
  }).then(res => res.json()).then(data => console.log(data))

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
          {` `}
          Powered by
          {` `}
          <a href="https://enonic.com">Enonic XP</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
