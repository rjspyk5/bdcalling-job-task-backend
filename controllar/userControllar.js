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
  register: async (req, res) => {
    const data = req?.body;
    try {
      const result = await User.create(data);
      console.log(result);
    } catch (error) {
      handleError(error, res);
    }
  },
  updateUser: async (req, res) => {
    const data = req?.body;
    const id = req?.params?.id;
    try {
      const result = await User.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      console.log(result);
    } catch (error) {
      handleError(error, res);
    }
  },

  updateProfile: async (req, res) => {
    const data = req.body;
    try {
      const result = await User.findOneAndUpdate({ email: data?.email }, data, {
        new: true,
        runValidators: true,
      });
      console.log(result);
    } catch (error) {
      handleError(error, res);
    }
  },
};
