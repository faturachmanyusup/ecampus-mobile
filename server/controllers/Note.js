const client = require('../config/mongo');
const {encrypt, decrypt} = require('../helpers/jwt');

class Note {
  static async getAll(req, res) {
    try {
      const notes = client.db("Class").collection("notes");
      const user = decrypt(req.headers.token);
      const query = {user: user.email};
      const notesData = await notes.find(query).toArray();
      return res.status(200).json({notes: notesData});
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: "internal server error"});
    }
  }

  static async add(req, res) {
    try {
      const notes = client.db("Class").collection("notes");
      console.log(req.headers.token)
      const user = decrypt(req.headers.token);
      // const newNote = decrypt(req.body.note);
      const doc = {
        user: user.email,
        category: req.body.category,
        createdAt: new Date(),
        updatedAt: new Date(),
        desc: req.body.desc
      }
      await notes.insertOne(doc);
      return res.status(201).json({message: "success add note"});
    } catch (e) {
      console.log(e);
      return res.status(500).json({message: "internal server error"});
    }
  }
}

module.exports = Note;