import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/nextjs";

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, { connectTimeoutMS: 2000 });
    console.log("Connecting to MongoDB succesful");
  } catch (error) {
    console.error("There was a problem with the connection", error);
  }
}

export default connectToDatabase;
