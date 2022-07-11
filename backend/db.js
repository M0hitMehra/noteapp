const mongoose = require("mongoose");

const mongooseURI =  "mongodb+srv://mohitMehra:789789789@cluster0.q94ly.mongodb.net/noteapp?retryWrites=true&w=majority";

// "mongodb://localhost:27017/mynotebook?readPreference=primary&ssl=false&directConnection=true"

const connectToMongoose = () => {
  mongoose.connect(mongooseURI, () => {
    console.log("Connected to Mongoose");
  });
};
 
module.exports =  connectToMongoose; 