const express = require("express");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();

app.use("/", urlRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
