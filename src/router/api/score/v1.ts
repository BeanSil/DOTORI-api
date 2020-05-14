import * as Router from 'koa-router';

import {
  getUserScore,
  getAllArchives,
  insertArchive,
  updateArchive,
  deleteArchive
} from '../../../controller';
import { LoginRequired, AdminOnly } from '../../../utils/authorization';

const score = new Router();

score.get('/', LoginRequired, getUserScore);
score.get('/archive', AdminOnly, getAllArchives);
score.post('/archive', AdminOnly, insertArchive);
score.put('/archive', AdminOnly, updateArchive);
score.delete('/archive', AdminOnly, deleteArchive);

export default score;
