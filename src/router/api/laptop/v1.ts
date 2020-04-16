import * as Router from 'koa-router';

import {
  applyLaptop,
  cancelLaptop,
  checkLaptop,
  roomList,
  reservedSeats,
  roomDetail
} from '../../../controller/laptop.controller';
import { validateAdmin, validateStudent } from '../../../middlewares';

const v1 = new Router();

// GET
v1.get('/', validateStudent, checkLaptop);
v1.get('/room', roomList);
v1.get('/room/:room', reservedSeats);
v1.get('/room/detail/:room', validateAdmin, roomDetail);

// POST
v1.post('/', validateStudent, applyLaptop);

// DELETE
v1.delete('/', validateStudent, cancelLaptop);

export default v1;
