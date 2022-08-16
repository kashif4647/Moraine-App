import mongoose, { Schema } from 'mongoose';

const applicationSchema = new mongoose.Schema({
  requests: [
    {
      subject: {
        type: String,
      },
      description: {
        type: String,
      },
      status: {
        type: String,
        enum: ['in-process', 'approved', 'reject'],
        default: 'in-process',
      },
    },
  ],
  program: {
    name: { type: String },
    status: {
      type: String,
      enum: ['in-process', 'approved', 'reject'],
      default: 'in-process',
    },
  },
  studentRef: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Role = mongoose.model('Application', applicationSchema);

export default Role;
