import * as Router from 'koa-router';
import * as Controller from '../../../../controller/music.controller';

const v1 = new Router();

v1.get('/', Controller.getMusic);
v1.post('/', Controller.applyMusic);
v1.put('/', Controller.checkmusic);
v1.delete('/', Controller.deleteMusic);

export default v1;
