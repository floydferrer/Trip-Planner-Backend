"use strict";

const db = require("../db");


class Trip {
  static async create(body) {
    if(Array.isArray(body.tripInfo)) { 
      let i = 1;
      let queryString = `
        INSERT INTO trips
        (username, stops, name)
        VALUES
      `
      const queryArr = [body.username];
      while(i <= body.tripInfo.length) {
        queryString += `($1, $${i * 2}, $${i * 2 + 1})`;
        if(i !== body.tripInfo.length) queryString += ', '
        queryArr.push(body.tripInfo[i - 1].tripDetails)
        queryArr.push(body.tripInfo[i - 1].name)
        i++;
      }

      const result = await db.query(
        `${queryString}
        RETURNING id, name, stops`,
        queryArr
      );

      for(let row of result.rows) {
        for(let i = 0; i < row.stops.length; i++) {
          row.stops.push(JSON.parse(row.stops[0]))
          row.stops.shift()
        }
      }
      return result.rows;
    }

    const stops = body.tripInfo.tripDetails[0]
    const name = body.tripInfo.tripName
    const username = body.username;

    const result = await db.query(
      `INSERT INTO trips
      (username, stops, name)
      VALUES ($1, $2, $3)
      RETURNING id, name, stops`,
      [
        username, stops, name
      ],
    );

    for(let row of result.rows) {
      for(let i = 0; i < row.stops.length; i++) {
        row.stops.push(JSON.parse(row.stops[0]))
        row.stops.shift()
      }
    }

    return result.rows
  }

  static async get(username) {
    const tripsRes = await db.query(
          `SELECT id, stops, name
           FROM trips
           WHERE username = $1`,
        [username]);

    let trips = tripsRes.rows || '';
    const tripsParsed = [];
    if(trips !== '') {
        let stopsParsed;
        trips.map(trip => {
          stopsParsed = trip.stops.map(stop => (
            JSON.parse(stop)
          ))
          trip.stops = stopsParsed;
          tripsParsed.push(trip);
        })
      trips = tripsParsed;
    }
    return trips;
  }

  static async remove(id) {
    await db.query(
          `DELETE
           FROM trips
           WHERE id = $1`,
        [id]);
  }
}


module.exports = Trip;
