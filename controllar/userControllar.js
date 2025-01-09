const handleError = require("../libs/handleError");
const User = require("../model/userModel");

module.exports = {
  getUser: async (req, res) => {
    const data = req.body;
    const page = req?.query?.page;
    const limit = req?.query?.limit;
    const skip = (page - 1) * limit;
    try {
      const result = await User.find().skip(skip).limit(limit);
      console.log(result);
    } catch (error) {
      handleError(error, res);
    }
  },
  register: async (req, res) => {},
  updateUser: async (req, res) => {},
  updateProfile: async (req, res) => {},
};
