import { Router } from "express";
import * as registerPageController from "../../controllers/register_page/register_page.controller";
import * as middlewares from "../../middlewares/index"

const router=Router();

router.post('/set_password',[middlewares.verifySecretKey, middlewares.verifyUser],registerPageController.setPassword);
router.post('/',[middlewares.verifySecretKey],registerPageController.register);

export default router;


