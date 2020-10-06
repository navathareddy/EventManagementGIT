const mongoose = require("mongoose");
const express = require("express");
const app = express();

const categoryRouter = require("./routes/eventCategories");

require("./start/cors")(app);

app.use(express.json());

app.use("/api/categories", categoryRouter);

const MONGODB_URI =
  "mongodb+srv://navatha:123@cluster0.qlewb.mongodb.net/NGOEVENTS?retryWrites=true&w=majority";

mongoose
  .connect(MONGODB_URI || "mongodb://localhost/session12", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected successfully"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 8000;
app.listen(port, console.log("listening to port 8000"));

if (process.env.NODE_ENV == "production") {
  app.use(express.static("./client/build"));
}
