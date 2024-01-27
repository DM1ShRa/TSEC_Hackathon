const mongoose = require("mongoose");

export const connectMongoDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is conneted");
    } catch (error) {
        console.log(error);
    }
};