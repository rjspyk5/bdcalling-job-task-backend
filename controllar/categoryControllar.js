const handleError = require("../libs/handleError");
const Category = require("../model/categoryModel");

module.exports = {
  createCategory: async (req, res) => {
    try {
      const result = await Category.create(req?.body);
      res.send({
        success: true,
        message: "Category Registered successfully!",
        result,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
  getCategory: async (req, res) => {
    const id = req?.params?.id || null;
    try {
      if (id) {
        const result = await Category.findById(id);
        return res.send({
          success: true,
          message: "Categories retrieve successfully!",
          result,
        });
      }
      const result = await Category.find();
      return res.send({
        success: true,
        message: "Categories retrieve successfully!",
        result,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
  updateCategory: async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    try {
      const result = await Category.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      return res.send({
        success: true,
        message: "Category updated successfully!",
        result,
      });
    } catch (error) {
      handleError(error, res);
    }
  },

  deleteCategory: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Category.findByIdAndDelete(id);
      return res.send({
        success: true,
        message: "Category deleted successfully!",
        result,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};
