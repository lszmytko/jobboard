import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/nextjs";

async function connectToDatabase() {
  try {
    console.log("Connecting to MongoDB", uri);
    await mongoose.connect(uri);
  } catch (error) {
    console.error("There was a problem with the connection", error);
  }
}

export default connectToDatabase;
