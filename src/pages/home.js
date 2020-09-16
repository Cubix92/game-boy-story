import React from "react"
import {Link, graphql} from "gatsby"
import Layout from "../components/layout"
import Helmet from "react-helmet";

export default function Home({pageContext: { currentPage, totalPages }, data}) {
    const {allMarkdownRemark} = data;

    function Next(props) {
        if (props.currentPage < props.totalPages) {
            return <Link to={"/" + (currentPage + 1)}> ... &#9654;</Link>;
        }

        return <a className="disabled"> ... &#9654;</a>;
    }

    function Prev(props) {
        if (props.currentPage > 1) {
            return <Link to={"/" + (currentPage - 1)}>&#9664; ... </Link>;
        }

        return <a className="disabled">&#9664; ... </a>;
    }

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

            <div className="pagination">
                <Prev currentPage={currentPage} />
                <span>{currentPage}</span>
                <Next currentPage={currentPage} totalPages={totalPages} />
            </div>
        </Layout>
    )
}

export const HomeQuery = graphql`
    query HomeQuery($skip: Int!, $limit: Int!) {
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
