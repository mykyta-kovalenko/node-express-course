import mongoose from 'mongoose';

const Task = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [20, 'Name cannot be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Task', Task);
