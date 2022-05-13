let db = require("../connectionToDB/Connection");
let sql = db.sequelize;


// API FOR BIDDING ON A AUCTION
exports.bidAtAuction = async (req, res) => {
  
//   AUCTIONID AND BIDVALUE PROVIDED WITH REQ
  if (!req.body.auctionId || !req.body.bidValue) {
    res
      .status(400)
      .send("Some of the fields are empty !\n Please provide all the fields");
    return;
  }

  try {
    const { auctionId, bidValue } = req.body;
    // USERID
    const { userId } = req.user;

    // CHECKING IF THE AUCTION WITH GIVEN ID IS PRESENT OR NOT
    const [check] = await sql.query(
      `SELECT name from auctiondetail where auctionId='${auctionId}';`
    );
  
    if (check.length >= 1) {
      const [result1, result2] = await sql.query(
        `insert into bidvalue (auctionId,bidderId,bidValue) values ('${auctionId}','${userId}','${bidValue}');`
      );
     
      if (result1 === 0 && result2 === 1) {
        res.status(200).send(`Bid on auction succesfully bid`);
        return;
      } else {
        res.status(400).send("problem while bidding");
      }
    } else {
      res.status(404).send("Auction not found");
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Some error while bidding");
  }
};


// API FOR THE LIST OF BIDS
exports.listOfBids = async (req, res) => {
 
  try {
    //   QUERY FOR JOINING TABLES AND FETCHING DATA
    const [result] = await sql.query(`SELECT 
        a.name as auctionName,
        b.bidValue,
        concat(u.firstName,' ',u.lastName) as bidderName,
        a.auctioneerName
        from auctiondetail as a join bidvalue as b 
        on a.auctionId=b.auctionId 
        join users as u on b.bidderId= u.userId ;`);

    if (result.length >= 1) {
      res.status(200).send(result);
      return;
    } else {
      res.status(404).send("List is empty ");
    }
  } catch (e) {
    res.status(500).send("Some error occured while preparing the list");
  }
};


// API FOR DECLARING THE WINNER OF A PARTICULAR AUCTION
exports.winnerOfAuction = async (req, res) => {

    // AUCTION ID PROVIDED IN PARAMS OF REQ
  if (!req.params.auctionId) {
    res.status(400).send("please provide the Id of auction in params");
    return;
  }
  try {
    const [result] = await sql.query(`SELECT 
        a.name as auctionName,
        b.bidValue,
        concat(u.firstName,' ',u.lastName) as bidderName,
        a.auctioneerName
        from auctiondetail as a join bidvalue as b 
        on a.auctionId=b.auctionId
        join users as u on b.bidderId = u.userId
        where a.auctionId = '${req.params.auctionId}'
        ORDER BY bidValue desc
        ;`);

    if (result.length >= 1) {
      const winner = {
        title: "Winner",
        Name: result[0].bidderName,
        Bid: result[0].bidValue,
        Auction: result[0].auctionName,
        Auctioneer: result[0].auctioneerName,
      };
      console.log(winner);
      
      res.status(200).send(winner);
    } else {
      res.status(400).send("No winner found");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Error while declaring the winner");
  }
};
