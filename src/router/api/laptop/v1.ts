import * as Router from 'koa-router';

import {
    applyLaptop,
    cancelLaptop,
    checkLaptop
} from '../../../controller/laptop.controller'

const v1 = new Router();

//GET
v1.get('/', checkLaptop);

//POST
v1.post('/', applyLaptop);

//DELETE
v1.delete('/', cancelLaptop);

export default v1;