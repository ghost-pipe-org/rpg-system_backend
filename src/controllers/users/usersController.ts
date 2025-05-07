import type { Request, Response } from "express";


export async function usersController(_: Request, res: Response) {
    res.status(200).json({ message: "Users controller, rota privada uiui" });
}
