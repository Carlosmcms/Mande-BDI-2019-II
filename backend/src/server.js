const express = require('express');
const compression = require('compression');
const cors = require('cors');
const { schema } = require('./schema');
const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');
const expressPlayground = require('graphql-playground-middleware-express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use('*', cors());
app.use(compression());

const servidor = new ApolloServer({
  schema,
  introspection: true,
});

servidor.applyMiddleware({ app });

// app.get('/', expressPlayground({
//     endpoint: '/graphql'
// }));

const httpServer = createServer(app);

const PORT = process.env.PORT || 5000;

httpServer.listen({ port: PORT }, () =>
  console.log(`Running on http://localhost:${PORT}/graphql`)
);
