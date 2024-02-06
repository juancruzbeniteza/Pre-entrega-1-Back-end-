const { model, Schema } = require('mongoose');

const ProductSchema = new Schema({
  // Define your product schema fields here
  // Example: title, description, price, etc.
});

const ProductModel = model('Product', ProductSchema);

module.exports = {
  create: async (data) => {
    try {
      const newProduct = await ProductModel.create(data);
      return newProduct;
    } catch (error) {
      throw error;
    }
  },

  read: async () => {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      throw error;
    }
  },

  // Add other CRUD operations as needed
};
