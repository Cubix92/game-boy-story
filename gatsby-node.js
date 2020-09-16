exports.createPages = async ({actions, graphql, reporter}) => {
    const {createPage} = actions
    const result = await graphql(`
    {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 1000
        ) {
            edges {
                node {
                    frontmatter {
                        slug
                    }
                }
            }
        }
    }
    `)

    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    const articles = result.data.allMarkdownRemark.edges
    const articlesPerPage = 4
    const totalPages = Math.ceil(articles.length / articlesPerPage)

    createPage({
        path: `/`,
        component: require.resolve("./src/templates/home.js"),
        context: {
            limit: articlesPerPage,
            skip: 0,
            currentPage: 1,
            totalPages: totalPages,
        },
    })

    Array.from({length: totalPages}).forEach((_, currentPage) => {
        createPage({
            path: `/${currentPage + 1}`,
            component: require.resolve("./src/templates/home.js"),
            context: {
                limit: articlesPerPage,
                skip: currentPage * articlesPerPage,
                currentPage: currentPage + 1,
                totalPages: totalPages,
            },
        })
    })

    result.data.allMarkdownRemark.edges.forEach(({node}) => {
        createPage({
            path: node.frontmatter.slug,
            component: require.resolve(`./src/templates/article.js`),
            context: {
                slug: node.frontmatter.slug,
            },
        })
    })
}