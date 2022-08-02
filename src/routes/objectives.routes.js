import { Router } from "express";
import * as objectivesController from "../controllers/objectives.controller";
import * as middlewares from "../middlewares/index"

const router=Router();

router.get('/',[middlewares.verifySecretKey],objectivesController.getObjectives);
router.post('/',[middlewares.verifySecretKey],objectivesController.addObjective);
router.put('/:objectiveName',[middlewares.verifySecretKey],objectivesController.updateObjective);
router.delete('/:objectiveName',[middlewares.verifySecretKey],objectivesController.deleteObjective);

export default router;


