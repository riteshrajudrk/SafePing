const mongoose = require('mongoose');

const arrivalLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    contactSnapshots: [
      {
        name: String,
        phone: String,
      },
    ],
    message: {
      type: String,
      required: true,
    },
    distanceMeters: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ['sent', 'simulated', 'partial', 'failed'],
      default: 'sent',
    },
    providerResponses: [
      {
        contactName: String,
        phone: String,
        deliveryStatus: String,
        sid: String,
        error: String,
      },
    ],
    sentAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('ArrivalLog', arrivalLogSchema);
