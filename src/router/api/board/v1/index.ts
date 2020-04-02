import * as Router from 'koa-router';

import {
  getPosts,
  getPost,
  putPost,
  postPost,
  deletePost
} from '../../../../controller/board.v1.controller';

const v1 = new Router();

// BULK-GET
v1.get('/', getPosts);

// BULK-GET - pagination
v1.get('/page/:page([0-9])', getPosts);

// GET
v1.get('/:postid([0-9])', getPost);

// POST
v1.post('/:postid([0-9])', postPost);

// PUT
v1.put('/', putPost);

// DELETE
v1.delete('/:postid([0-9])', deletePost);

export default v1;
