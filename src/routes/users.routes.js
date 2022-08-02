import { Router } from "express";
import * as usersController from "../controllers/users.controller";
import * as middlewares from "../middlewares/index"

const router=Router();

router.get('/',[middlewares.verifySecretKey],usersController.getUsers);
router.get('/:userName',[middlewares.verifySecretKey],usersController.getUserByName);
router.post('/',[middlewares.verifySecretKey],usersController.addUser);
router.put('/:userName',[middlewares.verifySecretKey],usersController.updateUser);
router.delete('/:userName',[middlewares.verifySecretKey],usersController.deleteUser);

export default router;


