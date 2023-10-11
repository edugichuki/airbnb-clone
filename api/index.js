const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bcryptSalt = bcrypt.genSaltSync(10);
const User = require("./models/user.js");
require("dotenv").config({ path: "../vars/.env" });
const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Origin"],
    optionsSuccessStatus: 204,
  })
);

mongoose.set("strictQuery", false);
// Define a function named connectDB that connects to a MongoDB database.
const connectDB = async () => {
  try {
    // Construct a connection URL using environment variables.
    const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vkgutad.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
    // Use Mongoose to connect to the MongoDB server using the URL.
    const conn = await mongoose.connect(url);
    // Log a message indicating a successful database connection.
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (e) {
    // If there's an error, log an error message and exit the application.
    console.log("Connection error: " + e.message);
    process.exit(1); // Exiting the application with an error code (1).
  }
};
// Define a variable named PORT and assign it a value from an environment variable or 80 if not defined.
let PORT = 8080;

// Call the connectDB function to establish a connection to the MongoDB database.
connectDB().then(() => {
  // After the database connection is established, start a web server on the specified port.
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`CORS-enabled web server listening on port ${PORT}`);
  });
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const userDoc = await User.create({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, bcryptSalt),
  });
  res.json(userDoc);

  res.status(422).json(e);
});
