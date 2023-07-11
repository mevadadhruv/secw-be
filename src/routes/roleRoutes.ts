import express from 'express';
import RoleController from '../controllers/roleController';
import { iocContainer as Container } from '../config/container';
import { IRoleService } from '../interfaces/IRoleService';
import { types } from '../config/types';

const roleService = Container.get<IRoleService>(types.IRoleService);
const roleController = new RoleController(roleService);

const roleRouter = express.Router();

roleRouter.post('/createrole', (req, res, next) => roleController.addRole(req, res, next));
roleRouter.get('/getrole/:id', (req, res, next) => roleController.getRoleById(req, res, next));
roleRouter.get('/getroles', (req, res, next) => roleController.getRoles(req, res, next));
roleRouter.put('/updaterole/', (req, res, next) => roleController.updateRole(req, res, next));
roleRouter.delete('/deleterole/:id', (req, res, next) => roleController.deleteRole(req, res, next));

export default roleRouter;
