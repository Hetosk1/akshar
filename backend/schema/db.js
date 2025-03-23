const mongoose = require('mongoose');
const MONGOOSE_URI = "mongodb://127.0.0.1:27017/akshar";

const initDatabase = async () => {

    mongoose.connect(MONGOOSE_URI)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((_error) => {
        console.log(`Error connecting to database: ${_error}`);
    });

};

const UserSchema = new mongoose.Schema({
    address: {
        type: String,
        require: true
    },
    files: {
        type: [String],
        require: true
    }
});

const userModel = mongoose.model("user", UserSchema);

module.exports = {
    initDatabase, userModel 
};
