const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");


dotenv.config();

const app = express();
const port = 3000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB Connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);

    });
  })
  .catch(error => {
    console.error("Error connecting to database:", error);
  });
app.use(express.json());
app.use(helmet());

app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);


app.get("/", (req, res) => {
  res.send("Hello World");
})
// app.get("/user", (req, res) => {
//   res.send("this is user page");

// })