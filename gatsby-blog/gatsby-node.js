// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }
const path=require('path');
const {createFilePath}=require(`gatsby-source-filesystem`);

exports.onCreateNode=({node,getNode, actions})=>{
  const {createNodeField}=actions;
  // console.log(node.internal.type)
  // if(node.internal.type===`allMarkdownRemark`){
  //   const slug=createFilePath({node, getNode})
  //   createNodeField({
  //     node,
  //     name:`slug`,
  //     value:slug,
  //   })
  // }
  if(node.internal.type===`MarkdownRemark`){
    const slug=createFilePath({node, getNode})
    createNodeField({
      node,
      name:`slug`,
      value:slug,
    })
  }

}

exports.createPages=async({graphql,actions})=>{
  const {createPage}=actions;
  return graphql(`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
  `
  ).then(result=>{
    result.data.allMarkdownRemark.edges.forEach(({node})=>{
      createPage({
        path: node.fields.slug,
        component: path.resolve('./src/templates/blog-post.js'),
        context:{
          slug:node.fields.slug,
        }
      })
    })
  })
}