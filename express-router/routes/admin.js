const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (req.query.isAdmin) {
    return next();
  }

  res.send("Only admins can access this page.");
});

router.get("/manage", (req, res) => {
  res.send("Manage shelters and dogs");
});

router.get("/topsecret", (req, res) => {
  res.send("SUPER SECRET PAGE");
});

module.exports = router;
