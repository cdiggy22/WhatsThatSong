"use strict";

/** Routes for saved tracks. */

const jsonschema = require("jsonschema");
const express = require("express");

const { BadRequestError } = require("../expressError");
const { ensureAdmin } = require("../middleware/auth");
const Track = require("../models/track");

const trackNewSchema = require("../schemas/trackNew.json");
// const trackUpdateSchema = require("../schemas/trackUpdate.json");
const trackSearchSchema = require("../schemas/trackSearch.json");

const router = new express.Router();


/** POST / { track } =>  { track }
 *
 * track should be { track_id, name, artist_id, username }
 *
 * Returns { track_id, name, artist_id, username }
 *
 * Authorization required: admin
 */

router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, trackNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const track = await Track.create(req.body);
    return res.status(201).json({ track });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { tracks: [ { track_id, name, artist_id, username }, ...] }
 *
 * Can filter on provided search filters:
 * - artist
 *
 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;

  try {
    const validator = jsonschema.validate(q, trackSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const tracks = await Track.findAll(q);
    console.log(tracks);
    return res.json({ tracks });
  } catch (err) {
    return next(err);
  }
});

/** GET /[track_id]  =>  { track }
 *
 *  Track is { track_id, name, artist_id, username }
 *
 * Authorization required: none
 */

router.get("/:track_id", async function (req, res, next) {
  try {
    const track = await Track.get(req.params.track_id);
    return res.json({ track });

  } catch (err) {
    return next(err);
  }
});

/** PATCH /[track_id] { fld1, ... } => { track }
 *
 * Patches track data.
 *
 * fields can be: { name }
 *
 * Returns { track_id, name, artist_id, username }
 *
 * Authorization required: admin
 */

router.patch("/:track_id", ensureAdmin, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, trackUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const track = await Track.update(req.params.track_id, req.body);
    return res.json({ track });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[track]  =>  { deleted: track_id }
 *
 * Authorization: admin
 */

router.delete("/:track_id", ensureAdmin, async function (req, res, next) {
  try {
    await Track.remove(req.params.track_id);
    return res.json({ deleted: req.params.track_id});
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
