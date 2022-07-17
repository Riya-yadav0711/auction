require("dotenv").config();
var jwt = require("jsonwebtoken");


// Authentication
module.exports = auth = (Permission) => (req, res, next) => {

  if (req.headers.authorization === undefined) {
    res.status(401).json({
      error: "Invalid request! No tokens are provided,Please provide token. ",
    });
  } else {
    
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (token.includes("Bearer")) {
        res.status(401).json({
          error: "token can not start with Bearer",
        });
      }

      const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
     

      if (Permission.includes(decodedToken.role)) {
        req.user = decodedToken;
        next();
      } else {
        res.status(401).json({
          error: "invailid User",
        });
      }
    } catch (err) {
      res.status(401).send("Invalid token" + err);
    }
  }
 
};
