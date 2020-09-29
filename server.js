require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");

// Importing Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const articleRouter = require("./routes/articles");

//Connection To DB
mongoose
  .connect(process.env.DBLocal, {
    useNewUrlParser: true, //compulsory
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(()=> console.log("DB is conected"))
  
//custome Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", articleRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is up and running at http://localhost:${port}/api`));
