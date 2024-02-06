const { connect } = require("mongoose");

const dbConnection = async () => {
  try {
    await connect(process.env.DB_LINK, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db connected");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

module.exports = dbConnection;
