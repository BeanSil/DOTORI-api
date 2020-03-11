import * as Router from 'koa-router';
import * as Controller from '../../../controller/score.controller';
import { validateStudent, validateAdmin } from '../../../middlewares';

const score = new Router();

score.get('/', validateStudent, Controller.getUserScore);
score.get('/archive', validateAdmin, Controller.getAllArchives);
score.post('/archive', validateAdmin, Controller.insertArchive);
score.put('/archive', validateAdmin, Controller.updateArchive);
score.delete('/archive', validateAdmin, Controller.removeArchive);

export default score;