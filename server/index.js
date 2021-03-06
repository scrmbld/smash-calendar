const fs = require('fs');
const { graphql, buildSchema } = require('graphql');
const fetch = require('node-fetch');

const now = (+ new Date) / 1000;//get a time value in the same format as smashgg
const endpoint = 'https://api.smash.gg/gql/alpha';
var token = fs.readFileSync("token.txt").toString();
token = token.replace(/\s+/g, '');

var query = `query TournamentsInRaduis {
  tournaments(query: {
    perPage: 20
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
      startAt
      venueAddress
    }
  }
}
`
query = JSON.stringify({ query: query });


var head = {
  "Content-Type": "application/json",
  "Authorization": "Bearer " + token
};


function sortOutput(response) {
  let temp = response.data.tournaments.nodes;
  let output = [];

  for (var i = 0; i < temp.length; i++) {
    //don't include tournaments that have already happened
    if (temp[i].startAt < now) {
      console.log(temp[i].name + " has already happened");
      continue;
    }
    //don't include online tournaments
    if (temp[i].venueAddress.length < 25) {
      console.log(temp[i].name + " is an online / placeholder tournament");
      continue;
    }

    output.push(temp[i]);
    }

  console.log(output); //FOR DEBUG PURPOSES
  return output;
}

//get info from api
async function outputData(header, query) {
  console.log("waiting...");
  var result = await fetch(endpoint, {method: 'POST',headers: head,body: query,});
  result = await result.json();
  console.log(result.data.tournaments.nodes.length)
  console.log(now);
  result = await sortOutput(result);//package up info nicely
  fs.writeFile("output.json", JSON.stringify(result), (err) => {
    if (err) throw err;
    console.log("Write completed");
  });
}

outputData(head, query);
