import mongoose from "mongoose";

const connectDatabase = async () => {
    let connection = await mongoose.connect(process.env.MONGODB_URL);
    if(connection) {
        try{
            console.log(`MongoDB connection established`);
        } catch(e) {
            console.log(`MongoDB connection cannot be established`);
        }
    }
}

export default connectDatabase;