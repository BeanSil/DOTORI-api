import * as Router from 'koa-router';

import {
  getUserScore,
  getAllArchives,
  insertArchive,
  updateArchive,
  deleteArchive
} from '../../../controllers';
import { validateStudent, validateAdmin } from '../../../middlewares';

const score = new Router();

score.get('/', validateStudent, getUserScore);
score.get('/archive', validateAdmin, getAllArchives);
score.post('/archive', validateAdmin, insertArchive);
score.put('/archive', validateAdmin, updateArchive);
score.delete('/archive', validateAdmin, deleteArchive);

export default score;
