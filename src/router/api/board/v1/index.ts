import * as Router from 'koa-router';

import {
  getPosts,
  getPost,
  putPost,
  postPost,
  deletePost
} from '../../../../controller/board.v1.controller';
import { LoginRequired } from '../../../../utils/authorization';

const v1 = new Router();

// TODO: 모두 게시판 구분을 url에 추가해줄것.

// BULK-GET
v1.get('/:board', getPosts);

// BULK-GET - pagination
v1.get('/:board/page/:page', getPosts);

// GET
v1.get('/:board/:postid', getPost);

// POST
v1.post('/:board/:postid', LoginRequired, postPost);

// PUT
v1.put('/:board', LoginRequired, putPost);

// DELETE
v1.delete('/:board/:postid', LoginRequired, deletePost);

export default v1;
