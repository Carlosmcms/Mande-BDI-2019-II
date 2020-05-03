const { IResolvers } = require('graphql-tools');
const { query } = require('./query');
const { mutation } = require('./mutation');


const resolvers = {
  ...query,
  ...mutation
}

module.exports =  { resolvers };