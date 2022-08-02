import { Router } from "express";
import * as loginPageController from "../../controllers/login_page/login_page.controller";

const router=Router();

router.post('/',[],loginPageController.login);

export default router;


