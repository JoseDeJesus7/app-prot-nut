import { Router } from "express";
import * as foodsController from "../controllers/foods.controller"
import * as middlewares from "../middlewares/index"

const router=Router()

router.get('/', [middlewares.verifySecretKey], foodsController.getFoods)
router.get('/:foodName',[middlewares.verifySecretKey],foodsController.getFoodByName);
router.get('/username/:userName',[middlewares.verifySecretKey],foodsController.getFoodsByUsername);
router.post('/',[middlewares.verifySecretKey],foodsController.addFood);
router.put('/:foodName',[middlewares.verifySecretKey],foodsController.updateFood);
router.delete('/:userName/:foodName',[middlewares.verifySecretKey],foodsController.deleteFood);

export default router


