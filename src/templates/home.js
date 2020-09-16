import React from "react"
import { Link,  graphql  } from "gatsby"
import Layout from "../components/layout"
import Pagination from "../components/pagination"
import Helmet from "react-helmet";

export default function Home({pageContext: { currentPage, totalPages }, data}) {
    const {allMarkdownRemark} = data;

    return (
        <Layout>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Game Boy Story</title>
            </Helmet>
            <Helmet title="" defer={false} />
            {allMarkdownRemark.edges.map((article, index) => (
                <section key={index}>
                    <Link to={article.node.frontmatter.slug}>
                        <img
                            src={"thumbnails/" + article.node.frontmatter.thumbnail}
                            alt={article.node.frontmatter.title}
                        />
                    </Link>
                    <div>
                        <small>{article.node.frontmatter.category}</small>
                        <h2>{article.node.frontmatter.title}</h2>
                        <p>{article.node.frontmatter.excerpt}</p>
                    </div>
                </section>
            ))}

            <Pagination currentPage={currentPage} totalPages={totalPages} />
        </Layout>
    )
}

export const pageQuery = graphql`
    query($skip: Int!, $limit: Int!) {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: $limit
        skip: $skip
      ) {
          edges {
            node {
              frontmatter {
                date
                slug
                title
                category
                excerpt
                thumbnail
              }
          }
        }
      }
    }
`
