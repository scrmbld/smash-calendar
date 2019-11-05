const fs = require('fs');
const { graphql, buildSchema } = require('graphql');
const fetch = require('node-fetch');

const endpoint = 'https://api.smash.gg/gql/alpha';
var token = fs.readFileSync("token.txt").toString();
token = token.replace(/\s+/g, '');

var query = `query EventStandings {
  event(id: 78790) {
    name
    standings(query: {
      perPage: 3,
      page: 1
    }){
      nodes {
        standing
        entrant {
          name
        }
      }
    }
  }
}
`
query = JSON.stringify({ query: query });

var head = {
  "Content-Type": "application/json",
  "Authorization": "Bearer " + token
};


async function outputData(header, query) {
  console.log("waiting...");
  var result = await fetch(endpoint, {method: 'POST',headers: head,body: query,});
  result = await result.json();
  console.log(result.data.event.standings.nodes);
}

outputData(head, query);
//setTimeout((response) => {console.log(response)}, 1000));
