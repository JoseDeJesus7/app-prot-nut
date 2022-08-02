import { Router } from "express";
import * as ingredientsController from "../controllers/ingredients.controller";
import * as middlewares from "../middlewares/index"

const router=Router();

router.get('/',[middlewares.verifySecretKey],ingredientsController.getIngredients);
router.get('/:ingredientName',[middlewares.verifySecretKey],ingredientsController.getIngredientByName);
router.get('/username/:userName',[middlewares.verifySecretKey],ingredientsController.getIngredientsByUsername);
router.post('/',[middlewares.verifySecretKey],ingredientsController.addIngredient);
router.put('/:ingredientName',[middlewares.verifySecretKey],ingredientsController.updateIngredient);
router.delete('/:userName/:ingredientName',[middlewares.verifySecretKey],ingredientsController.deleteIngredient);

export default router;


