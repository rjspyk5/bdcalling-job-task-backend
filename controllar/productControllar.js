const handleError = require("../libs/handleError");
const Product = require("../model/productModel");

module.exports = {
  getProduct: async (req, res) => {
    const id = req?.params?.id || null;
    try {
      if (id) {
        const result = await Product.findById(id);
        return res.send({
          success: true,
          message: "Product retrieve successfully!",
          result,
        });
      }
      const result = await Product.find();
      return res.send({
        success: true,
        message: "Products retrieve successfully!",
        result,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
  updateProduct: async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    try {
      const result = await Product.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      return res.send({
        success: true,
        message: "Product updated successfully!",
        result,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
  deleteProduct: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Product.findByIdAndDelete(id);
      return res.send({
        success: true,
        message: "Product deleted successfully!",
        result,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
  addProduct: async (req, res) => {
    try {
      const result = await Product.create(req?.body);
      res.send({
        success: true,
        message: "Product Registered successfully!",
        result,
      });
    } catch (error) {
      handleError(error, res);
    }
  },
};
