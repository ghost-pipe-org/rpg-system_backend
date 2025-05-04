import type { Express } from 'express';
import { registerController } from './registerController';

export async function usersRoutes(app :Express){
    app.post("/users", registerController);
}