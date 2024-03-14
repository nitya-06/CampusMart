const app = require("./app");
const dotenv  = require("dotenv");
const cloudinary  = require("cloudinary");

// handling uncaught exceptions
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exceptions`);

    process.exit(1);

})

// config
dotenv.config({path:"backend/config/config.env"});

// connect to database

const connectDatabase = require("./config/database");
connectDatabase();

// connecting to cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET
});



// server
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at http://localhost:${process.env.PORT}`);
})

// unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });

})