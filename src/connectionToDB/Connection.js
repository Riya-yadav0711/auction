const Sequelize = require('sequelize');
 
// Connection to db using Sequelize
module.exports = con = {};


//Information of DB
const config={
 
 database: {
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'auction'
  }
}
  
const sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
    host: config.database.host,
    dialect: 'mysql',
   
  });

  con.sequelize = sequelize;


  sequelize.authenticate().then(()=>{
      console.log('connected succesfully to DB')

  }).catch(err=>{
      console.log("Error in connecting to DB ",err)
  })