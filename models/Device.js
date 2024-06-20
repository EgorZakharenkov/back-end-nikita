import mongoose from "mongoose";
const DeviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tests: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
      },
    ],
    default: [],
  },
  infos: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Info",
      },
    ],
    default: [],
  },
});

export default mongoose.model("Device", DeviceSchema);
