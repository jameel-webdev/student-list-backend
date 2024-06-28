import mongoose, { Schema } from "mongoose";

// Define the Mongoose schema for the Student model
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfAdmission: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Export the Student model
export const Student = mongoose.model("Student", studentSchema);
