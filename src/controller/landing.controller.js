let db = require("../connectionToDB/Connection");
let sql = db.sequelize;
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
var validator = require("validator");
var jwt = require("jsonwebtoken");

// API FOR SIGNUP
exports.signUp = async (req, res) => {
  try {
    //   USER NAME,EMAIL,PASSWORD AND ROLE
    const { firstName, lastName, email, password, role } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
      res
        .status(400)
        .send("One of the given field is empty! \n Please fill all fields ");
      return;
    }

    var roleId;
    // CREATING A UNIQUE ID FOR EACH USER
    const uuid = uuidv4();

    // ENCRYPTING PASSWORD BEFORE INSERTING IT INTO DB
    const bcryptedPassword = bcrypt.hashSync(password, 10);

    // SETTING ROLE ID ACCORDING TO THE ROLE PROVIDED BY USER
    if (role == "bidder") {
      roleId = 2;
    } else {
      roleId = 1;
    }


    const [result1, result2] = await sql.query(
      `insert into users (userId,firstName,lastName,role,email,password) values('${uuid}','${firstName}','${lastName}','${roleId}','${email}','${bcryptedPassword}');`
    );


    if (result1 === 0 && result2 === 1) {
      res.send("signUp Successful");
    } else {
      res.status(400).send("error in signing up");
    }
  } catch (err) {
    res.status(500).send("Some error occured while signUp" + err.message);
  }
};


// API FOR LOGIN 
exports.login = async (req, res) => {

    // USER EMAIL AND PASSWORD
  if (!req.body.email || !req.body.password) {
    res
      .status(400)
      .send("Some of the fields are empty ! \n Please fill at fields");
    return;
  }

//   CHECKING IF EMAIL IS VALID
  if (!validator.default.isEmail(req.body.email)) {
    res.status(400).send("Invalid email");
    return;
  }

  const email = req.body.email;

  try {
    const [user] = await sql.query(`SELECT
         r.roleName as role,
         u.firstName,
         u.lastName,
         u.userId,
         u.email,
         u.password
         FROM users  as u INNER JOIN role as r 
         ON u.role = r.roleId
         WHERE email='${email}';`);

    console.log(user.length >= 1);

    if (user.length >= 1) {
        // CHECKING IF THE PROVIDED PASSWORD IS RIGHT
      const match = await bcrypt.compare(req.body.password, user[0].password);
      console.log(match);

      if (match) {
        
        // PREPARING TOKEN
        var token = jwt.sign(
          {
            email: user[0].email,
            name: user[0].firstName + " " + user[0].lastName,
            role: user[0].role,
            userId: user[0].userId,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
          },
          process.env.TOKEN_SECRET
        );
        // RESPONSE 
        res.status(200).send({
          token: token,
          userId: user[0].userId,
          user: user[0].firstName + " " + user[0].lastName,
          role: user[0].role,
          email: user[0].email,
        });
      
      } else {
        res
          .status(401)
          .send("Invalid Credentials! \n Check email and password. ");
      }
    } else {
      res.status(404).send("User not found with given information !");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Some error occured while login! " + err.message);
  }
};
