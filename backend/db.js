// Connecting to database server
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook";
const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log("Connected to Mongo Successfully"))
        .catch(error => console.log(error));
}

module.exports = connectToMongo;