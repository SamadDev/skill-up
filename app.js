const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
require("colors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
const courses = require("./routes/courses");
const auth = require('./routes/auth');
const users=require("./routes/users");
const reviews=require("./routes/reviews");
const enroll=require("./routes/enroll");
const access=require("./routes/accessEnroll");
const view=require("./routes/view");
const follow=require("./routes/follow");
const love=require("./routes/love");

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers

app.use("/api/v1/courses", courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users',users);
app.use('/api/v1/reviews',reviews);
app.use('/api/v1/enroll',enroll);
app.use('/api/v1/access',access);
app.use('/api/v1/view',view);
app.use('/api/v1/follow',follow);
app.use('/api/v1/love',love);


app.use(errorHandler);

const PORT = process.env.PORT || 8080;

app.listen(
  PORT,
  console.log(
    `Server running in ${3000} mode on port ${PORT}`.yellow.bold
  ),
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
