const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv  = require("dotenv");




// middleware for error handling
app.use(errorMiddleware);


// config
dotenv.config({path:"backend/config/config.env"});



app.use(express.json({limit: '50mb'}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());

// Product Route imports
const product = require("./routes/productRoute");
app.use("/api/v1",product);

// User Route imports
const user = require("./routes/userRoute");
app.use("/api/v1",user);

// order Route imports
const order = require("./routes/orderRoute");
app.use("/api/v1",order);

// payment route imports
const payment = require("./routes/paymentRoute");
app.use("/api/v1",payment);


module.exports = app;