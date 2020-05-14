import * as Router from 'koa-router';

import {
  applyLaptop,
  cancelLaptop,
  checkLaptop,
  roomList,
  reservedSeats,
  roomDetail
} from '../../../controller/laptop.controller';
import { LoginRequired, AdminOnly } from '../../../utils/authorization';

const v1 = new Router();

// GET
v1.get('/', LoginRequired, checkLaptop);
v1.get('/room', roomList);
v1.get('/room/:room', reservedSeats);
v1.get('/room/detail/:room', AdminOnly, roomDetail);

// POST
v1.post('/', LoginRequired, applyLaptop);

// DELETE
v1.delete('/', LoginRequired, cancelLaptop);

export default v1;
