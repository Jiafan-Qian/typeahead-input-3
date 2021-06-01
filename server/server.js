//read package
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const { Schema } = mongoose;

//read class
const State = require('../model/state.js');

//mongoDB model schemma
const StatesSchema = new Schema({
  name: {type: String},
  abbreviation: {type: String}
});
const States = mongoose.model("us_states", StatesSchema);

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    getSuggestions(userInput: String): [State]
  }

  type State {
      name: String,
      abbreviation: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  //filter all the suggestions that have the user input content
  getSuggestions: ({ userInput }) => {
    return States.find().then(states => {
      return states.filter(i => i.name.toLowerCase().includes(userInput.toLowerCase()));
    });
  }
};

//express graphql server setup
var app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

//read data from mongoDB
const uri = "mongodb+srv://jiqi7875:Qjf33161136@cluster0.rflyh.mongodb.net/database?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>{
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`listening on http://localhost:${port}/graphql`);
});
});