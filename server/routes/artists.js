"use strict";

/** Routes for artist. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Artist= require("../models/artist");

const artistNewSchema = require("../schemas/artistNew.json");
// const artistUpdateSchema = require("../schemas/artistUpdate.json");
const artistSearchSchema = require("../schemas/artistSearch.json");

const router = new express.Router();


/** POST / { artist } =>  { artist }
 *
 * artist should be { artist_id, name, country }
 *
 * Returns { artist_id, name, country }
 *
 * Authorization required: admin
 */

router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, artistNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const artist = await Artist.create(req.body);
    return res.status(201).json({ artist });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { artist: [ { artist_id, name, country }, ...] }
 *
 * Can filter on provided search filters:
 * - country
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;
  // arrive as strings from querystring, but we want as ints
  try {
    const validator = jsonschema.validate(q, artistSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const artist = await Artist.findAll(q);
    console.log(artist);
    return res.json({ artist });
  } catch (err) {
    return next(err);
  }
});

/** GET /[artist_id]  =>  { artist }
 *
 *  Artist is { artist_id, name, country }
 *   
 * Authorization required: none
 */

router.get("/:artist_id", async function (req, res, next) {
  try {
    const artist = await Artist.get(req.params.artist_id);
    return res.json({ artist });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[artist_id] { fld1, fld2, ... } => { artist }
 *
 * Patches artist data.
 *
 * fields can be: { name, country }
 *
 * Returns { artist_id, name, country }
 *
 * Authorization required: admin
 */

router.patch("/:artist_id", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, artistUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const artist = await Artist.update(req.params.artist_id, req.body);
    return res.json({ artist });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[artist_id]  =>  { deleted: artist_id}
 *
 * Authorization: admin
 */

router.delete("/:artist_id", ensureAdmin, async function (req, res, next) {
  try {
    await Artist.remove(req.params.artist_id);
    return res.json({ deleted: req.params.artist_id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
