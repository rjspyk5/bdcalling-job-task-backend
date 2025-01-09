const handleError = require("../libs/handleError");
const User = require("../model/userModel");

module.exports = {
  getUser: async (req, res) => {
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 10;
    const skip = (page - 1) * limit;
    try {
      const result = await User.find()
        .skip(skip)
        .limit(limit)
        .select("-password");

      res.send({
        success: true,
        message: "Users retrieve successfully!",
        data: {
          meta: { page: page, limit: limit, total: result?.length },
          data: result,
        },
      });
    } catch (error) {
      handleError(error, res);
    }
  },
  register: async (req, res) => {
    const data = req?.body;
    try {
      const result = await User.create(data);
      const finalResult = result.toObject();
      delete finalResult.password;
      delete finalResult.__v;
      res.send({
        success: true,
        message: "User Registered successfully!",
        data: { ...finalResult },
      });
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
      }).select("-password");
      res.send({
        success: true,
        message: "User updated successfully!",
        data: data,
      });
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
      }).select("-password");
      res.send({
        success: true,
        message: "Profile updated successfully!",
        data: data,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};
