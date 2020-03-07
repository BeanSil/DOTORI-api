import * as Router from 'koa-router';
import * as Controller from '../../../controller/score.controller'

const score = new Router();

score.get('/');

score.get('/archive', Controller.getAllArchives);
score.post('/archive', Controller.insertArchive);
score.put('/archive', Controller.updateArchive);
score.delete('/archive', Controller.removeArchive);

export default score;