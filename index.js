const express = require("express");

const mongoose = require("mongoose");

const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/Posts");

const MONGO_URL = "mongodb+srv://mmuzammilansari:10FEQOLybWbAm3ut@cluster0.pm0sr7o.mongodb.net/"
const params = { useNewUrlParser: true, 
    useUnifiedTopology: true 
  }



const app = express();
const port = 3000;

mongoose.connect(MONGO_URL, params)
 

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
app.use("/api/posts", postRoute);


app.get("/", (req, res) => {
  res.send("Hello World");
})
// app.get("/user", (req, res) => {
//   res.send("this is user page");

// })