"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
// const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for tracks. */

class Track {
  /** Create a track (from data), update db, return new track data.
   *
   * data should be { track_id, name, artist_id, username }
   *
   * Returns { track_id, name, artist_id, username }
   *
   * Throws BadRequestError if company already in database.
   * */

  static async create({ track_id, name, artist_id, username, }) {
    const duplicateCheck = await db.query(
          `SELECT track_id
           FROM tracks
           WHERE track_id = $1`,
        [track_id]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate company: ${track_id}`);

    const result = await db.query(
          `INSERT INTO tracks
           (track_id, name, artist_id, username)
           VALUES ($1, $2, $3, $4)
           RETURNING track_id, name, artist_id, username`,
        [
          track_id,
          name,
          artist_id,
          username,
        ],
    );
    const track = result.rows[0];

    return track;
  }

  /** Find all tracks (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - name (will find case-insensitive, partial matches)
   *
   * Returns [{ track_id, name, artist_id, username }, ...]
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT t.track_id,
                        t.name,
                        t.artist_id AS "artistId",
                        t.username AS "userName"
                 FROM tracks t
                 LEFT JOIN artists AS a ON a.artist_id = t.artist_id
                 LEFT JOIN users AS u ON u.username = t.username`;
    let whereExpressions = [];
    let queryValues = [];

    const { name, username } = searchFilters;

    // For each possible search term, add to whereExpressions and queryValues so
    // we can generate the right SQL

    if (name) {
      queryValues.push(`%${name}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
    }
    if (username) {
        queryValues.push(`%${username}%`);
        whereExpressions.push(`username LIKE $${queryValues.length}`);
      }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY name";
    const tracksRes = await db.query(query, queryValues);
    return tracksRes.rows;
  }

  /** Given a track track_id, return data about track.
   *
   * Returns { track_id, name, artist_id, username }
   * where artist is [{ artist_id, name, country }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(track_id) {
    const trackRes = await db.query(
          `SELECT track_id,
                  name,
                  artist_id AS "artistId",
                  username,
           FROM tracks
           WHERE track_id = $1`,
        [track_id]);

    const track = trackRes.rows[0];

    if (!track) throw new NotFoundError(`No track: ${track_id}`);

    const artistsRes = await db.query(
          `SELECT artist_id, name, country
           FROM artists
           WHERE track_id = $1
           ORDER BY id`,
        [track.artistId],
    );
        delete track.artistId;
    track.artist =artistsRes.rows;

    return track;
  }

  /** Update track data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: { name, artist_id, username }
   *
   * Returns { track_id, name, artist_id, username }
   *
   * Throws NotFoundError if not found.
   */

//   static async update(track_id, data) {
//     const { setCols, values } = sqlForPartialUpdate(
//         data,
//         {
//           numEmployees: "num_employees",
//           logoUrl: "logo_url",
//         });
//     const handleVarIdx = "$" + (values.length + 1);

//     const querySql = `UPDATE companies 
//                       SET ${setCols} 
//                       WHERE handle = ${handleVarIdx} 
//                       RETURNING handle, 
//                                 name, 
//                                 description, 
//                                 num_employees AS "numEmployees", 
//                                 logo_url AS "logoUrl"`;
//     const result = await db.query(querySql, [...values, handle]);
//     const company = result.rows[0];

//     if (!company) throw new NotFoundError(`No company: ${handle}`);

//     return company;
//   }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if company not found.
   **/

  static async remove(track_id) {
    const result = await db.query(
          `DELETE
           FROM tracks
           WHERE track_id = $1
           RETURNING track_id`,
        [track_id]);
    const track = result.rows[0];

    if (!track) throw new NotFoundError(`No track: ${track_id}`);
  }
}


module.exports = Track;
