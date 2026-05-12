import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect(process.env.MONGO_URL as string);
      return true;
    }
  } catch (err) {
    console.log("ERROR in connecting to DB => ", err);
    return false;
  }
};

export default connectToDB;