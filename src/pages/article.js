import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Helmet from "react-helmet"

export default function Index({data}) {
    const {markdownRemark} = data
    const {frontmatter, html} = markdownRemark

    return (
        <Layout>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{frontmatter.title}</title>
                <meta name="description" content={frontmatter.excerpt} />
            </Helmet>
            <div dangerouslySetInnerHTML={{__html: html}}/>
        </Layout>
    )
}

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
                excerpt
            }
        }
    }
`
