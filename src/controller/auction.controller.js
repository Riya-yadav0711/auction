let db = require("../connectionToDB/Connection");
let sql = db.sequelize;
const { v4: uuidv4 } = require("uuid");



// API FOR CREATING A NEW AUCTION
exports.createAuction = async (req, res) => {
  // AUCTION NAME PROVIDE WITH REQ BODY
  if (!req.body.auctionName) {
    res.status(400).send("Please provide a Auction name");
    return;
  }

  try {
    const auctionName = req.body.auctionName;
    // EMAIL AND NAME OF USER
    const { email, name } = req.user;

    // INSERTING  NEW AUCTION INTO TABLE auctiondetail
    const [result1, result2] = await sql.query(
      `insert into auctiondetail (name,auctioneerName,auctioneerEmail) values ('${auctionName}','${name}','${email}');`
    );

    if ((result1) => 1 && result2 === 1) {
      res.status(200).send("Auction created successfully");
    } else {
      res.status(400).send("problem in creating auction ");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Error in creating a auction");
  }
};



// API TO GET LIST OF AUCTIONS
exports.getAuction = async (req, res) => {
  try {
    const [result] = await sql.query(`SELECT * FROM auctiondetail`);

    if (result.length >= 1) {
      res.status(200).send(result);
      return;
    } else {
      res.status(404).send("No auction found.");
      return;
    }
  } catch (err) {
    res.status(500).send("Error in getting auction list.");
  }
};



// API FOR DELETING A AUCTIOIN
exports.deleteAuction = async (req, res) => {
  // auction name PROVIDED WITH REQ
  if (!req.body.auctionName) {
    res.status(400).send("Please provide a auction name.");
    return;
  }
  try {
    //   DELETING AUCTION USING ITS NAME
    const result = await sql.query(
      `delete from auctiondetail where name='${req.body.auctionName}';`
    );
    console.log(result[0].affectedRows);
    if (result[0].affectedRows >= 1) {
      res.status(200).send("Auction deleted Successfully");
    } else {
      res.status(404).send("No auction with given name is found!");
      return;
    }
  } catch (e) {
    res.status(500).send("Error while deleting auction detail: " + e.message);
  }
};
