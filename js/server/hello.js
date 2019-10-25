const fs = require('fs');
var { graphql, buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };
var results = [];

graphql(schema, '{ hello }', root).then((response) => {
  console.log(response.data);
  results.push(response.data);
  console.log(results[0]);
});

function out() {
  results[0] = JSON.stringify(results[0]);
  fs.writeFile("output.json", results[0], (err) => {
    if (err) throw err;
  });
}

setTimeout(out, 300);
setTimeout(() => {
  console.log(results[0]);
}, 300);
