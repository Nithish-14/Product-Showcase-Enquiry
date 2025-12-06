const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middleware/errorMiddleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/api", (req, res) =>
  res.json({ status: "OK", message: "API running" })
);

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/enquiries", require("./routes/enquiryRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.use(errorMiddleware);

app.listen(PORT, () => console.log("Server running on", PORT));
