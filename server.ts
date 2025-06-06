import { env } from "@/env";
import app from "./src/app";
import { prisma } from "./src/lib/prisma";
import express from "express";
import cors from "cors";

const PORT = env.PORT || 3001;


const startServer = async () => {
    try {
        await prisma.$connect();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        app.use(cors());
        app.use(express.json());
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
};

startServer();