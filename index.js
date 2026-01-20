const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const Routes = require("./routes/route.js")

dotenv.config();

const PORT = process.env.PORT || 5000

app.use(express.json({ limit: '10mb' }))
app.use(cors())

// Fixed MongoDB connection with proper error handling
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("NOT CONNECTED TO NETWORK", err);
        console.log("\nTroubleshooting steps:");
        console.log("1. Check if your MongoDB Atlas cluster is active");
        console.log("2. Verify your IP is whitelisted in MongoDB Atlas Network Access");
        console.log("3. Check your .env file has correct MONGO_URL");
        console.log("4. Verify internet connection");
    });

// Alternative: Using async/await (recommended)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Connected to MongoDB successfully");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err.message);
        console.error("\nPossible solutions:");
        console.error("1. Check your internet connection");
        console.error("2. Verify MongoDB Atlas cluster is running");
        console.error("3. Check Network Access in MongoDB Atlas (whitelist your IP)");
        console.error("4. Verify database credentials in .env file");
        console.error("5. Try using a different DNS server (8.8.8.8)");
        process.exit(1); // Exit if can't connect to database
    }
};

// Comment out the mongoose.connect above and use this instead:
// connectDB();

app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});













// const express = require("express")
// const cors = require("cors")
// const mongoose = require("mongoose")
// const dotenv = require("dotenv")
// // const bodyParser = require("body-parser")
// const app = express()
// const Routes = require("./routes/route.js")

// const PORT = process.env.PORT || 5000

// dotenv.config();

// // app.use(bodyParser.json({ limit: '10mb', extended: true }))
// // app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

// app.use(express.json({ limit: '10mb' }))
// app.use(cors())

// mongoose
//     .connect(process.env.MONGO_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(console.log("Connected to MongoDB"))
//     .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

// app.use('/', Routes);

// app.listen(PORT, () => {
//     console.log(`Server started at port no. ${PORT}`)
// })