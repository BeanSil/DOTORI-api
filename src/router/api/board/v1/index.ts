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
v1.get('/page/:page', getPosts);

// GET
v1.get('/:postid', getPost);

// POST
v1.post('/:postid', postPost);

// PUT
v1.put('/', putPost);

// DELETE
v1.delete('/:postid', deletePost);

export default v1;
