import mongoose from 'mongoose';

// Collection 'tasks' for mongo
const taskSchema = mongoose.Schema(
  {
    taskDescription: { type: String, required: true },
    taskItems: [
      {
        todo: { type: String, required: true },
        rate: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
