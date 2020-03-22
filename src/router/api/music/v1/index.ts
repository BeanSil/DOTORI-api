import * as Router from 'koa-router';
import { Context, Next } from 'koa';
import * as Controller from '../../../../controller/music.controller'

const v1 = new Router();

v1.get('/',Controller.checkMusic);
v1.post('/',Controller.applyMusic);
v1.delete('/',Controller.deleteMusic);

export default v1;
