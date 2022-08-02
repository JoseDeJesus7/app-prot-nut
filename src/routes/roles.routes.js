import { Router } from "express";
import * as rolesController from "../controllers/roles.controller";
import * as middlewares from "../middlewares/index"

const router=Router();

// Agregar middleware para que solo el administrador pueda acceder a estas rutas
router.get('/',[middlewares.verifySecretKey],rolesController.getRoles);
router.post('/',[middlewares.verifySecretKey],rolesController.addRole);
router.put('/:roleName',[middlewares.verifySecretKey],rolesController.updateRole);
router.delete('/:roleName',[middlewares.verifySecretKey],rolesController.deleteRole);

export default router;


