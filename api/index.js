const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const fs = require("fs");
const bcrypt = require("bcrypt");
const download = require("image-downloader");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "hdasbnfbwjerhtjbgdas";
const User = require("./models/user.js");
const Place = require("./models/place.js");
const Booking = require("./models/booking.js");
require("dotenv").config({ path: "../vars/.env" });
const app = express();
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const mime = require("mime-types");

const bucket = "mybookingappbucket";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
//? for every link inside uploads should be displayed in the browser
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // preflightContinue: false,

    // allowedHeaders: ["Content-Type", "Authorization", "Origin"],
    // optionsSuccessStatus: 204,
  })
);

mongoose.set("strictQuery", false);
// Define a function named connectDB that connects to a MongoDB database.
// const connectDB = async () => {
//   try {
//     // Construct a connection URL using environment variables.
//     const mongoURL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.vkgutad.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;
//     // Use Mongoose to connect to the MongoDB server using the URL.
//     const conn = await mongoose.connect(mongoURL);
//     // Log a message indicating a successful database connection.
//     console.log(`MongoDB connected: ${conn.connection.host}`);
//   } catch (e) {
//     // If there's an error, log an error message and exit the application.
//     console.log("Connection error: " + e.message);
//     process.exit(1); // Exiting the application with an error code (1).
//   }
// };
// // Define a variable named PORT and assign it a value from an environment variable or 80 if not defined.
// let PORT = 8080;

// // Call the connectDB function to establish a connection to the MongoDB database.
// connectDB().then(() => {
//   // After the database connection is established, start a web server on the specified port.
//   app.listen(PORT, () => {
//     console.log(`Server started on port ${PORT}`);
//     console.log(`CORS-enabled web server listening on port ${PORT}`);
//   });
// });

const uploadToS3 = async (path, originalFilename, mimetype) => {
  const client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const parts = originalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      body: fs.readFileSync(path),
      key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
};

app.get("api/test", (req, res) => {
  mongoose.connect(mongoURL);
  res.json("test ok");
});

app.post("api/register", async (req, res) => {
  mongoose.connect(mongoURL);
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("api/login", async (req, res) => {
  mongoose.connect(mongoURL);
  const { email, password } = req.body;

  //? Query the DB
  const userFound = await User.findOne({ email: email });
  if (userFound) {
    const correctPass = bcrypt.compareSync(password, userFound.password);
    if (correctPass) {
      jwt.sign(
        { email: userFound.email, id: userFound._id, name: userFound.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userFound);
        }
      );
    } else {
      res.status(422).json("password failed");
    }
  } else {
    res.json("error");
  }
});

app.get("api/profile", (req, res) => {
  mongoose.connect(mongoURL);
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        // Handle the error here, e.g., send an error response
        res.status(401).json({ error: "Token is invalid" });
      } else {
        // Token is valid, you can use the "userData" object
        const { name, email, _id } = await User.findById(userData.id);
        res.json({ name, email, _id });
      }
    });
  } else {
    res.json(null);
  }
});

app.post("api/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("api/upload-by-link", async (req, res) => {
  const { uri } = req.body;
  const newName = "photo_" + Date.now() + ".jpg";
  const options = {
    url: uri,
    dest: "/tmp/" + newName,
  };
  await download.image(options);
  const url = await uploadToS3(
    "/tmp/" + newName,
    newName,
    mime.lookup("/tmp/" + newName)
  );
  res.json(url);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/tmp");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now());
  },
});

const upload = multer({ storage: storage });

app.post("api/uploads", upload.array("photos", 100), async (req, res, next) => {
  mongoose.connect(mongoURL);
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { filename, originalname, path, mimetype } = req.files[i];
    const url = await uploadToS3(path, originalname, mimetype);
    uploadedFiles.push(url);
  }
  res.json(uploadedFiles);
});
app.post("api/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      e;
      res.status(401).json({ error: "Token is invalid" });
    }
    const placeDoc = await Place.create({
      owner: userData.id,
      title: title,
      address: address,
      photos: addedPhotos,
      description: description,
      perks: perks,
      extraInfo: extraInfo,
      checkIn: checkIn,
      checkOut: checkOut,
      maxGuests: maxGuest,
      price: price,
    });
    res.json(placeDoc);
  });
});

app.get("api/user-places", (req, res) => {
  mongoose.connect(mongoURL);
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("api/places/:id", async (req, res) => {
  mongoose.connect(mongoURL);
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("api/places/:id", async (req, res) => {
  mongoose.connect(mongoURL);
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title: title,
        address: address,
        photos: addedPhotos,
        description: description,
        perks: perks,
        extraInfo: extraInfo,
        checkIn: checkIn,
        checkOut: checkOut,
        maxGuests: maxGuest,
        price: price,
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
});

app.get("api/places", async (req, res) => {
  mongoose.connect(mongoURL);
  res.json(await Place.find());
});

app.post("api/bookings", async (req, res) => {
  mongoose.connect(mongoURL);
  const userData = await getUserDataFromRequest(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  const bookingDoc = await Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  });
  res.json(bookingDoc);
});

const getUserDataFromRequest = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
};

app.get("api/bookings", async (req, res) => {
  mongoose.connect(mongoURL);
  const userData = await getUserDataFromRequest(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
});

app.listen(8080);
