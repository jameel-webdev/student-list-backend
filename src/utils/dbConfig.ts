import mongoose from "mongoose";

const dbConfig = async (uri: string) => {
  try {
    const connect = await mongoose.connect(uri);
    console.log(`MongoDb connected on host ${connect.connection.host}`);
  } catch (error) {
    console.log("MongoDb connection failed");
    process.exit(1);
  }
};

export default dbConfig;
