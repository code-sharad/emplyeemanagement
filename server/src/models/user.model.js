import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    adminEmail: {
      type: String,
      required: true,
    },
    WorkingHoursRemaning: [
      {
        date: {
          type: String,
        },
        remainingTime: {
          type: String,
        },
        isWorkCompleted: {
          type: Boolean,
        },
      },
    ],
    adminId: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    bio: {
      type: String,
    },

    firstName: {
      type: String,
      required: true,
      minlength: 3,
    },

    bio: {
      type: String,
      // required:true
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,

      // Ensure email is unique
      unique: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },

    password: {
      type: String,
      required: true,
    },

    avatar: {
      public_id: String,
      secure_url: String,
    },

    isActive: {
      type: Boolean,
      default: false,
      expiresIn: "2m",
    },

    role: {
      type: String,
      required: true,
      default: "user",
    },

    createdAt: {
      type: Date,
      default: Date.now,
      required: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },

    clockingHours: {
      type: Number,
    },

    employeeNotices: [
      {
        message: {
          type: String,
          expires: "50d",
        },

        createdAt: {
          type: Date,
          expires: "5d",
          default: Date.now,
        },

        createdBy: {
          type: String,
          required: true,
        },
      },
    ],

    dailyReports: [
      {
        projectName: {
          type: String,
        },

        workUrl: {
          type: String,
        },

        report: {
          type: String,
        },
        time: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    snapshots: [
      {
        type: Schema.Types.ObjectId,
        ref: "Snapshot",
      },
    ],

    sessions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Session",
      },
    ],

    hasClockedToday: {
      type: Boolean,
      default: false,
    },

    attendance: {
      date: {
        type: Date,
      },

      status: {
        type: String,
        enum: ["Absent", "Leave", "Present", "Late"],
      },

      totalHours: {
        type: Date,
      },

      remarks: {
        type: String,
      },

      reason: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  generateUserToken: function () {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        adminEmail: this.adminEmail,
        role: this.role,
        phoneNumber: this.phoneNumber,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  },
};

export const UserModel = model("UserModel", userSchema);
