import  express  from 'express';

import { deleteWall, getWall,postWall,putWall } from './Walls/wallsRoutes';
import { deleteUser, getUser,postLogin,postUser,putUser } from './Users/UsersRoutes';
import { videoDelete, videoGet, videoPost, videoPostUpdate, videoPut } from './Videos/videosRoutes';
import { lightDelete, lightGet, lightPost, lightPut } from './Lights/LightsRoutes';

export function CenterRoutes() {
    const router = express();


    router.use(deleteUser);
    router.use(getUser);
    router.use(postLogin);
    router.use(postUser);
    router.use(putUser);
    router.use(deleteWall);
    router.use(getWall);
    router.use(postWall);
    router.use(putWall);
    router.use(videoDelete)
    router.use(videoGet)
    router.use(videoPost)
    router.use(videoPostUpdate)
    router.use(videoPut)
    router.use(lightDelete)
    router.use(lightGet)
    router.use(lightPost)
    router.use(lightPut)

    return router;
}
