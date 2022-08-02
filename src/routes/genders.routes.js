import { Router } from "express";
import * as gendersController from "../controllers/genders.controller";
import * as middlewares from "../middlewares/index"

const router=Router();

router.get('/',[middlewares.verifySecretKey],gendersController.getGenders);
router.post('/',[middlewares.verifySecretKey],gendersController.addGender);
router.put('/:genderName',[middlewares.verifySecretKey],gendersController.updateGender);
router.delete('/:genderName',[middlewares.verifySecretKey],gendersController.deleteGender);

export default router;


