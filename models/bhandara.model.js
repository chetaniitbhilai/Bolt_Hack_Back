import mongoose from "mongoose";

const bhandaraSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date:{type:Date , required:true},
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  organizer: { type: String, required: true },
  foodItems: { type: [String], default: [] },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  attendees: { type: Number, default: 0 },
}, {
  timestamps: true
});

const Bhandara = mongoose.model("Bhandara", bhandaraSchema);
export default Bhandara;
