import express from 'express';
import {
  addPerson,
  deletePerson,
  getPeople,
  updatePerson,
} from '../controllers/people-controller.js';

const peopleRouter = express.Router();

peopleRouter.get('/', getPeople);

peopleRouter.post('/postman', addPerson);

peopleRouter.put('/:id', updatePerson);

peopleRouter.delete('/:id', deletePerson);

export default peopleRouter;
