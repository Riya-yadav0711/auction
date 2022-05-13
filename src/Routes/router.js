const express = require('express');
const router = express.Router();

// require("./bidder.route")(router);
require("./landing.route")(router);
require("./auction.route")(router);
require("./bid.route")(router);

module.exports = router;