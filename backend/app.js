require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
// middleweres
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// my routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentRoutes = require("./routes/stripePayment");
const User = require("./models/user");

const app = express();

// Db connection
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch(() => {
    console.log("DB got oopsss");
  });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My routes
app.use("/api", authRoutes);

// Test DB connection by fetching one user and printing it

app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentRoutes);

// port
const port = process.env.PORT;

// starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
