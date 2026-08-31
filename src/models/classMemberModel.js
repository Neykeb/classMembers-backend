const mongoose = require("mongoose");

const classMemberSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Vorname ist erforderlich"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Nachname ist erforderlich"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "E-Mail ist erforderlich"],
      unique: true,
      lowercase: true,
    },
    className: {
      type: String,
      required: [true, "Klassenname ist erforderlich"],
      trim: true,
    },
    status: {
      type: String,
      // enum erlaubt ausschließlich die hier definierten String-Werte
      enum: ["active", "inactive", "pending"],
      default: "pending",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("ClassMember", classMemberSchema);
