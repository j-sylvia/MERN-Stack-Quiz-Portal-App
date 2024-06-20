const mongoose = require('mongoose');
require("dotenv").config();
console.log("Mongodb");
console.log(process.env.MONGO_URL);

//set strictQuery:false to globally opt into filtering by properties that arent in the schema
//it removes preparatory warning for Mongoose 7.
mongoose.set("strictQuery", false);

//definne database url to connect to.
const mongoDB = process.env.MONGO_URL;

//wait for database to connect, logging an error if there is a problem
main()
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.error('Failed to connect to MongoDB', err));
async function main() {
    await mongoose.connect(mongoDB);
}