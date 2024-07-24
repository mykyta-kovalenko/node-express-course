import express from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from '../controllers/tasks-controller.js';

const tasksRouter = express.Router();

tasksRouter.route('/').get(getAllTasks);
tasksRouter.route('/').post(createTask);
tasksRouter.route('/:id').get(getTask);
tasksRouter.route('/:id').patch(updateTask);
tasksRouter.route('/:id').delete(deleteTask);

export default tasksRouter;
