"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Artist {
  /** Create a artist (from data), update db, return new artist data.
   *
   * data should be { artist_id, name, country }
   *
   * Returns { artist_id, name, country }
   *
   * Throws BadRequestError if company already in database.
   * */

  static async create({ artist_id, name, country }) {
    const duplicateCheck = await db.query(
          `SELECT artist_id
           FROM artists
           WHERE artist_id = $1`,
        [artist_id]);

    if (duplicateCheck.rows[0])
      throw new BadRequestError(`Duplicate artist: ${artist_id}`);

    const result = await db.query(
          `INSERT INTO artists
           (artist_id, name, country)
           VALUES ($1, $2, $3 )
           RETURNING artist_id, name, country`,
        [
          artist_id,
          name,
          country,
        ],
    );
    const artist = result.rows[0];

    return artist;
  }

  /** Find all artist (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - name (will find case-insensitive, partial matches)
   * - country
   *
   * Returns [{ artist_id, name, country }, ...]
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT artist_id,
                        name,
                        country
                 FROM artists`;
    let whereExpressions = [];
    let queryValues = [];

    const { name, country } = searchFilters;


    if (country) {
      queryValues.push(`%${country}%`);
      whereExpressions.push(`country ILIKE $${queryValues.length}`);
    }

    if (name) {
        queryValues.push(`%${name}%`);
        whereExpressions.push(`name ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY name";
    const artistsRes = await db.query(query, queryValues);
    return artistsRes.rows;
  }

  /** Given a artist_id, return data about artist.
   *
   * Returns { artist_id, name, country }
   *   where track is [{ track_id, name, artist_id, lyric_id }, ...]
   *
   * Throws NotFoundError if not found.
   **/

  static async get(artist_id) {
    const artistRes = await db.query(
          `SELECT artist_id,
                  name,
                  country
           FROM artists
           WHERE artist_id = $1`,
        [artist_id]);

    const artist = artistRes.rows[0];

    if (!artist) throw new NotFoundError(`No artist: ${artist_id}`);

    const trackRes = await db.query(
          `SELECT track_id, name, artist_id
           FROM tracks
           WHERE artist_id = $1
           ORDER BY track_id`,
        [artist_id],
    );

    artist.tracks = trackRes.rows;

    return artist;
  }

  /** Update artis data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {name, country }
   *
   * Returns {artist_id, name, country }
   *
   * Throws NotFoundError if not found.
   */

//   static async update(artist_id, data) {
//     const { setCols, values } = sqlForPartialUpdate(
//         data,
//         {
//           numEmployees: "num_employees",
//           logoUrl: "logo_url",
//         });
//     const handleVarIdx = "$" + (values.length + 1);

//     const querySql = `UPDATE artists
//                       SET ${setCols} 
//                       WHERE artist_id = ${handleVarIdx} 
//                       RETURNING artist_id, 
//                                 name, 
//                                 country`;

//     const result = await db.query(querySql, [...values, artist_id]);
//     const artist = result.rows[0];

//     if (!artist) throw new NotFoundError(`No artist: ${artist_id}`);

//     return artist;
//   }

  /** Delete given company from database; returns undefined.
   *
   * Throws NotFoundError if artist not found.
   **/

  static async remove(artist_id) {
    const result = await db.query(
          `DELETE
           FROM artists
           WHERE artist_id= $1
           RETURNING artist_id`,
        [artist_id]);
    const artist = result.rows[0];

    if (!artist) throw new NotFoundError(`No artist: ${artist_id}`);
  }
}


module.exports = Artist;
