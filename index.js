const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const trackRoute = require("./router/router")
const bodyParser = require('body-parser')

const app = express();

dotenv.config()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to the mongoDB")
    }).catch((err) => {
        console.log(err)
    })


app.get("/test", (req, res) => {
    res.json("Test ok")
})

app.use("/api", trackRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
