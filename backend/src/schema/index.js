const {  makeExecutableSchema } = require( 'graphql-tools');
require('graphql-import-node');
const typeDefs = require( './schema.graphql');
const { resolvers }  = require( '../resolvers/resolversMap');


const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

module.exports = { schema };