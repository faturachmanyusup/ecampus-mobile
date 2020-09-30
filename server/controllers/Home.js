const client = require('../config/mongo');

class Home {
  static async get(req, res) {
    try {
      const activities = client.db("Class").collection("activities");
      const notes = client.db("Class").collection("notes");
      const query = {user: req.USER.email};
      const activitiesData = await activities.findOne(query);
      const notesData = await notes.findOne(query);
      
      return res.status(200).json({
        activities: activitiesData.activities,
        notes: notesData
      });
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: "internal server error"});
    }
  }
}

module.exports = Home;