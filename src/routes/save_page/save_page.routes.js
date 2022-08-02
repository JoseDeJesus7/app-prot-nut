import { Router } from "express";
import * as savePageController from "../../controllers/save_page/save_page.controller";
import * as middlewares from "../../middlewares/index"

const router=Router();

router.post('/',[middlewares.verifyUser],savePageController.saveUser);

export default router;


