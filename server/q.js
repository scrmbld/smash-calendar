const fs = require('fs');
const { graphql, buildSchema } = require('graphql');
const fetch = require('node-fetch');

const endpoint = 'https://api.smash.gg/gql/alpha';
var token = fs.readFileSync("token.txt").toString();
token = token.replace(/\s+/g, '');

var query = `query TournamentsByState {
  tournaments(query: {
    perPage: 5
    filter: {
      location: {
          distanceFrom: "36.845,-119.720167"
          distance: "50mi"
      }
    }
  }) {
    nodes {
      id
      name
      addrState
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
  console.log(result.data.tournaments.nodes);
}

outputData(head, query);
//setTimeout((response) => {console.log(response)}, 1000));
