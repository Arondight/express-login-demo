import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: { type: String, index: true, unique: true },
  password: String,
  ctime: Date,
});

export default mongoose.model("user", schema);
