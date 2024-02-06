const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  // Define your user schema fields here
  // Example: username, email, password, etc.
});

const UserModel = model('User', UserSchema);

module.exports = {
  create: async (data) => {
    try {
      const newUser = await UserModel.create(data);
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  read: async () => {
    try {
      const users = await UserModel.find();
      return users;
    } catch (error) {
      throw error;
    }
  },

  // Add other CRUD operations as needed
};
