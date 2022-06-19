const mongoose = require("mongoose");

module.db = (uri) => {
    mongoose.connect(uri, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => {
        console.log(err);
    });
}