import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({

  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    company: String
  },

  message: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["new", "in_progress", "responded", "closed"],
    default: "new"
  }


}, { timestamps: true });

const Inquiry = mongoose.model("Inquiry", inquirySchema);
export default Inquiry;
