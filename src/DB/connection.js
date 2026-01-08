import mongoose from "mongoose";
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`Connected Successfully to Database`);
  } catch (error) {
    console.log(`Unable to connect to Database ${error.message}`);
  }
};
export default connectdb;
