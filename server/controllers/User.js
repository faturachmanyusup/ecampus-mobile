const client = require('../config/mongo');
const {encrypt} = require('../helpers/jwt');
const bcrypt = require('../helpers/bcrypt');
const {setUp} = require('../doc/activities');

class User {
  static async login(req, res) {
    try {
      const students = client.db("Class").collection("students");
      const query = {email: req.body.email};
      const student = await students.findOne(query);
      if(student) {
        const {_id, name, email, password, photo} = student;
        if (bcrypt.compare(req.body.password, password)) {
          const token = encrypt({_id, name, email, photo});
          return res.status(200).json({name, email, photo, token});
        }
      }
      return res.status(400).json({message: "invalid email or password"});
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "internal server error"});
    }
  }

  static async register(req, res) {
    try {
      console.log(req, "<<< req")
      const students = client.db("Class").collection("students");
      const isRegistered = await students.findOne({email: req.body.email});
      if (isRegistered) {
        return res.status(401).json({message: "Error. Email is already registered"});
      } else {
        const hash = bcrypt.hash(req.body.password);
        const query = {
          name: req.body.name,
          email: req.body.email,
          password: hash,
          photo: req.body.photo || ""
        };
        
        const student = await students.insertOne(query);
        const {_id, name, email, photo} = student.ops[0];
        
        const activities = client.db("Class").collection("activities");
        await activities.insertOne(setUp(email));
        
        const token = encrypt({_id, name, email, photo});
        
        return res.status(201).json({name, email, photo, token});
      }
    } catch (e) {
      return res.status(500).json({message: "internal server error"});
    }
  }

}

module.exports = User;