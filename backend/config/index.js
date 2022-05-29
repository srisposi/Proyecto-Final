require("dotenv").config();

let config = {
  port: process.env.PORT,
  cors: process.env.CORS,
  dev: process.env.NODE_ENV !== "production",
  admin: true,
};

let mongo_db = {
  uri: process.env.MONGO_DB_URI,
  name: process.env.DB_NAME,
  mongo_atlas: process.env.MONGO_ATLAS,
};

let email = {
  userEmail: process.env.USER_EMAIL,
  passwordEmail: process.env.PASSWORD_EMAIL,
};

module.exports = { config, mongo_db, email };
