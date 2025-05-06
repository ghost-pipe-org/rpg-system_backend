import type { Express } from 'express';
import { registerController } from './registerController';
import { authenticateController } from './authenticateController';

export async function usersRoutes(app :Express){
    app.post("/users", registerController);
    app.post("/users/authenticate", authenticateController);
}