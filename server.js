const express = require("express");
const mongoose = require("mongoose");

const tickets = require("./routes/api/tickets");

const app = express();

// Bodyparser
app.use(express.json());

// DB Config
const db = require("./config/keys").MONGO_URI;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.log(err));

// Use routes
app.use("/api/tickets", tickets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
