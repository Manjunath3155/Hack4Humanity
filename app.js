const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const courseRouter = require("./routes/courses");
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");
const authMiddleware = require("./middleware/auth"); 

const app = express();
const PORT = 4000;



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(
  session({
    secret: "your_secret_key", 
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/your_db_name",
      collectionName: "sessions",
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, 
  })
);


app.get("/", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "Main.html"));
});

app.get("/aboutus", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/aboutus.html"));
});

app.get("/contact", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/contact.html"));
});

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/login.html"));
});

app.get("/signup.html", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/signup.html"));
});


app.use("/auth", authRouter);

// Courses Router
app.use("/courses", courseRouter);

// Jobs Router
app.use("/jobs", jobsRouter);

// -------------------
// Serve Static Assets
// -------------------

// Serve static files for frontend assets (CSS, JS, images, etc.)
app.use(["/assets"], express.static(path.join(__dirname, "frontend")));

// Serve static files for courses (CSS, JS, images, etc.)
app.use("/",express.static(path.join(__dirname, "public", "courses")));

// Serve static files for jobs (CSS, JS, images, etc.)
app.use("/",express.static(path.join(__dirname, "/public/jobs")));

// -------------------
// Mongoose Connection
// -------------------
mongoose
  .connect("mongodb://localhost:27017/your_db_name") // Removed deprecated options
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
