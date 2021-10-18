import express from 'express';
import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';

const router = express.Router();

// @desc    Create new task
// @route   POST /api/tasks
// @access  Public
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { taskDescription, taskItems } = req.body;

    if (taskItems && taskItems.length === 0) {
      res.status(400);
      throw new Error('No task items');
    } else {
      const task = new Task({
        taskDescription,
        taskItems,
      });

      const createdTask = await task.save();
      res.status(201).json(createdTask);
    }
  })
);

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const { taskDescription, taskItems } = req.body;
    const task = await Task.findById(req.params.id);

    if (task) {
      task.taskDescription = taskDescription;
      task.taskItems = taskItems;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  })
);

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
      res.json(task);
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  })
);

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const tasks = await Task.find({});
    res.json(tasks);
  })
);

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (task) {
      await task.remove();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404);
      throw new Error('Task not found');
    }
  })
);

export default router;
