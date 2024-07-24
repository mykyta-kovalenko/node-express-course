import mongoose from 'mongoose';

const Task = new mongoose.Schema({
  name: String,
  completed: Boolean,
});

export default mongoose.model('Task', Task);
