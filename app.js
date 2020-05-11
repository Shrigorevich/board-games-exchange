const express = require("express");
const connectDB = require("./db");
const path = require("path");
const cors = require("cors"); /*for development*/
const session = require("express-session");
const User = require("./models/User");
const app = express();

process.env.NODE_CONFIG_DIR = './config'
connectDB();

app.use(
   session({
      name: "sid",
      resave: false,
      saveUninitialized: false,
      secret: "randomstring",
      cookie: {
         maxAge: 1000 * 30,
         sameSite: true,
         secure: false,
      },
   })
);

app.use(express.json({ extended: true }));
//app.use(cors()); /*for development*/

//app.use("/", require("./routes/default"))
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/games", require("./routes/api/games"));
app.use("/api/exchanges", require("./routes/api/exchanges"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
   // Set static folder
   app.use(express.static("client/build"));

   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
