import { makeGetAllSessionsService } from '@/services/factories/makeGetAllSessionsService';
import { GetAllSessionsService } from '@/services/sessions/getAllSessionsService';
import { Request, Response } from 'express';

export async function getAllSessionsController(req: Request, res: Response) {
    const getAllSessionsService =  makeGetAllSessionsService();

    try {
        const { sessions } = await getAllSessionsService.execute();
        return res.status(200).json({ sessions });
    } catch (error) {
        console.error("Error fetching available sessions:", error);
        return res.status(500).json({ error: "Internal server error" });
    }

}