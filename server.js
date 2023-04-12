// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || "development";
// Load the module dependenciess
var mongoose = require("./config/mongoose"),
  express = require("./config/express");
const { graphqlHTTP } = require("express-graphql");
var schema = require("./app/graphql");
var cors = require("cors");
// Create a new Mongoose connection instance
var db = mongoose();
// Create a new Express application instance
var app = express();

// Add the CORS middleware
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
  })
);

// Use the Express application instance to listen to the '5002' port
app.listen(5002, function () {
  console.log("GraphQL Server running at http://localhost:5002/graphql");
});

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app; //returns the application object
