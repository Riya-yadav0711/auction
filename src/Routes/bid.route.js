const Authentication=require("../Authentication/auth")

module.exports =app=>{

    const bid=require("../controller/bid.controller")

    // API FOR BIDDER TO BID AT A AUCTION
    app.post("/bidAtAuction",Authentication(["bidder"]),bid.bidAtAuction);

    // API FOR LIST OF BID
    app.get("/listOfBids",Authentication(["auctioneer","bidder"]),bid.listOfBids);


    // API FOR LIST OF BID WINNER
    app.get("/winnerOfAuction/:auctionId",Authentication(["auctioneer","bidder"]),bid.winnerOfAuction);

}