require("dotenv").config();

const http = require("http");

const cors = require("cors");

const express = require("express");

const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");

const homeRoutes = require("./routes/home");

const userRoutes = require("./routes/user");

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/uploads/payment-proof", express.static(`${__dirname}/uploads/payment-proof`));

app.use("/uploads/food-menu", express.static(`${__dirname}/uploads/food-menu`));

app.use("/api", homeRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/user", userRoutes);

const server = http.createServer(app);

const PORT = process.env.SERVER_PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
