import mongoose, { model, models, Schema } from "mongoose";

const jobShema = new Schema(
  {
    company: {
      type: String,
      require: true,
    },
    position: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Technical Round", "Offer", "Rejected"],
      default: "Applied",
    },
    appliedDate: {
      type: String,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Job = models.Job || mongoose.model("Job", jobShema);
