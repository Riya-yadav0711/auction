const Authentication=require("../Authentication/auth")

module.exports=app=>{

    const auction=require('../controller/auction.controller')
  
    // API FOR CREATING AUCTION
    app.post("/createAuction",Authentication(["auctioneer"]),auction.createAuction)

    // API FOR GETTING AUCTION LIST
    app.get("/getAuction",Authentication(["auctioneer","bidder"]),auction.getAuction)

    // API FOR DELETEING AUCTION
    app.delete("/deleteAuction",Authentication(["auctioneer"]),auction.deleteAuction);

    
    

}