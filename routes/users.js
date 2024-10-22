const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../middleware/auth");
const User = require("../models/user");

router.get("/:username", ensureLoggedIn, async function (req, res, next) {
try {
    const user = await User.get(req.params.username);
    return res.json({ user });
} catch (err) {
    return next(err);
}
});

router.patch("/:username", ensureLoggedIn, async function (req, res, next) {
    try {
      const user = await User.update(req.params.username, req.body.updateData);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;