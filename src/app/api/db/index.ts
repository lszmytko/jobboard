import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;

async function dbConnect() {
  if (mongoose.connection.readyState === 0) {
    const options: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    await mongoose.connect(uri, options);
  }

  return mongoose.connection;
}

export default dbConnect;
