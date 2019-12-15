const fs = require('fs');
const { graphql, buildSchema } = require('graphql');
const fetch = require('node-fetch');
const Tournament = require('./Tournament');

const now = (+ new Date) / 1000;//get a time value in the same format as smashgg

//used inside outputData()
function sortOutput(response) {
  let input = response.data.tournaments.nodes;
  let output = [];

  for (var i = 0; i < input.length; i++) {
    temp = new Tournament(input[i].id, input[i].name, input[i].startAt, input[i].venueAddress);
    //don't include tournaments that have already happened
    if (temp.startAt < now) {
      console.log(temp.name + " has already happened");
      continue;
    }
    //don't include online tournaments
    if (temp.venueAddress.length < 25) {
      console.log(temp.name + " is an online / placeholder tournament");
      continue;
    }

    output.push(temp);
    }

  console.log(output); //FOR DEBUG PURPOSES
  return output;
}

//get info from api
async function outputData(head, query, endpoint) {
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

//this is what gets called by index.js
function main(lat, long, rad) {
  var endpoint = 'https://api.smash.gg/gql/alpha';
  var token = fs.readFileSync("token.txt").toString();
  token = token.replace(/\s+/g, '');

  var query = `query TournamentsInRaduis {
    tournaments(query: {
      perPage: 20
      filter: {
        location: {
            distanceFrom: "${lat}, ${long}"
            distance: "${rad}mi"
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
  outputData(head, query, endpoint);
}

module.exports = main;
