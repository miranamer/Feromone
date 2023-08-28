const express = require('express');
const port = 5000;
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors')
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(port, console.log('server running on port: ', port));