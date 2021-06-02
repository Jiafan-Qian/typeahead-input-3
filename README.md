# Typeahead Suggestion Input 3

## Description
Same as Typeahead Suggestion Input 2(https://github.com/Jiafan-Qian/typeahead-input-2), using mongoDB instead of states.json file.

Update: filter the data in DB not server.

## Project Setup and Run
Make sure to change the connection string( uri on line 51 in server.js) to the one that connects your own database.

Use two terminals:

* server:
```
cd server
npm install
node server.js
```

* Vue app:
```
cd typeahead-search-demo
npm install
npm run serve
```
Then navigate to http://localhost:8080/

## Reference
* Using GraphQL with MongoDB - Compose Articles: https://www.compose.com/articles/using-graphql-with-mongodb/
