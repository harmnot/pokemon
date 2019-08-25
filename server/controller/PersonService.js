const { Person } = require("../model/index.js");

class PersonService {
  static async getDetailUser(req, res, next) {
    const { email } = req.query;
    try {
      const getDetail = await Person.findOne({ email }).populate({
        path: "pokex",
        populate: {
          path: "pokemon"
        }
      });
      if (!getDetail) {
        res.status(404).json({ error: `can't found any` });
      } else {
        res.status(200).json({ result: getDetail });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = PersonService;
