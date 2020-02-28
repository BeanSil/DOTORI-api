import * as Router from 'koa-router';

import { getPosts, getPost } from './v1.controller';

const v1 = new Router();

// BULK-GET
v1.get('/', getPosts);

// GET
v1.get('/:postid', getPosts);

// POST
// PUT
// DELETE

export default v1;