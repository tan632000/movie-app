const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require('body-parser')
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/users.js");
const bannerRoutes = require("./routes/banners.js");
const favoriteRoutes = require("./routes/favorites.js");
const movieRoutes = require("./routes/movies.js");

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
dotenv.config();
mongoose.set('strictQuery', true);
const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("database connnected");
    })
    .catch((err) => {
      throw err;
    });
};
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/banners", bannerRoutes);
app.use("/api/favorite", favoriteRoutes);
app.use("/api/movie", movieRoutes);

app.listen(8900, () => {
  connect();
  console.log("connected");
});
