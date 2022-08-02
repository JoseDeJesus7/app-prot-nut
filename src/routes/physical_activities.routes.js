import { Router } from "express";
import * as physicalActivitiesController from "../controllers/physical_activities.controller";
import * as middlewares from "../middlewares/index"

const router=Router();

router.get('/',[middlewares.verifySecretKey],physicalActivitiesController.getPhysicalActivities);
router.post('/',[middlewares.verifySecretKey],physicalActivitiesController.addPhysicalActivity);
router.put('/:physicalActivityName',[middlewares.verifySecretKey],physicalActivitiesController.updatePhysicalActivity);
router.delete('/:physicalActivityName',[middlewares.verifySecretKey],physicalActivitiesController.deletePhysicalActivity);

export default router;


