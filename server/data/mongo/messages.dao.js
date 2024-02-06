const { model, Schema } = require('mongoose');

const MessageSchema = new Schema({
  // Define your message schema fields here
  // Example: userId, text, timestamp, etc.
});

const MessageModel = model('Message', MessageSchema);

module.exports = {
  create: async (data) => {
    try {
      const newMessage = await MessageModel.create(data);
      return newMessage;
    } catch (error) {
      throw error;
    }
  },

  read: async () => {
    try {
      const messages = await MessageModel.find();
      return messages;
    } catch (error) {
      throw error;
    }
  },

  // Add other CRUD operations as needed
};
