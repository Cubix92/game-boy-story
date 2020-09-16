import React from "react"
import {Link} from "gatsby"
import Layout from "../components/layout"

export default function Home() {
  return (
      <Layout>
          <h2>Strona o podanym adresie nie istnieje.</h2>
          <h3 style={{ textAlign: `center` }}>Możesz <Link to="/">wrócić</Link> na stronę główną.</h3>
      </Layout>
  )
}
