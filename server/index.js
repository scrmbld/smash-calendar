//this script simply calls others, such as gg.js
//editing this can change the region tournamet data gets pulled for

const fs = require('fs');
const { graphql, buildSchema } = require('graphql');
const fetch = require('node-fetch');
const Tournament = require('./Tournament');
const gg = require('./gg');

//edit these to change the location and raius for the smashgg query
const location = [36.845, -119.720]; //latitude, longitude
const radius = 50; //miles

const now = (+ new Date) / 1000;//get a time value in the same format as smashgg
gg(location[0],location[1], 50);

// TODO: add facebook queries


// TODO: push data to google calendar
