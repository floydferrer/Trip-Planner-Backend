"use strict";

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const Trip = require("../models/trip");
const router = new express.Router();


router.post("/", async function (req, res, next) {
  try {
    const tripInfo = await Trip.create(req.body);
    return res.status(201).json(tripInfo);
  } catch (err) {
    return next(err);
  }
});

router.get("/:user", ensureLoggedIn, async function (req, res, next) {
  try {
    const trips = await Trip.get(req.params.user);
    if(trips === '') {
        return res.send(trips);
    }
    return res.json({ trips });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    await Trip.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;