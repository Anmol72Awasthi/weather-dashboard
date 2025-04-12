const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const weatherRoutes = require("./routes/weather.js");

app.use(cors());
app.use(express.json());
app.use(weatherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
