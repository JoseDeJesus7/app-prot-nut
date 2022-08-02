import { Router } from "express";
import * as diseasesController from "../controllers/diseases.controller";
import * as middlewares from "../middlewares/index"

const router=Router();

router.get('/',[middlewares.verifySecretKey],diseasesController.getDiseases);
router.post('/',[middlewares.verifySecretKey],diseasesController.addDisease);
router.put('/:diseaseName',[middlewares.verifySecretKey],diseasesController.updateDisease);
router.delete('/:diseaseName',[middlewares.verifySecretKey],diseasesController.deleteDisease);

export default router;


