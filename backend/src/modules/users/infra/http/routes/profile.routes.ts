import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);
console.log('message2');
profileRouter.get('/', profileController.show);
profileRouter.put('/', profileController.update);

export default profileRouter;
