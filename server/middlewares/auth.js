const client = require('../config/mongo');
const {decrypt} = require('../helpers/jwt');

module.exports = {
  authentication: async (req, res, next) => {
    try {
      if (!req.headers.token) {
        return res.status(401).json({message: "Sorry, you have to login first"});
      } else {
        console.log(req.headers.token, "<<< token")
        const {email} = decrypt(req.headers.token);
        const students = client.db("Class").collection("students");
        const student = await students.findOne({email});
        if (student) {
          req.USER = student;
          next();
        } else {
          return res.status(400).json({message: "invalid token"});    
        }
      }
    } catch (e) {
      console.log(e, "<<< e auth");
      return res.status(500).json({message: "internal server error"});
    }
  }
}