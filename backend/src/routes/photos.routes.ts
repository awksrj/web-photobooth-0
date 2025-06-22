import { Router } from "express"; 
import Photostrip, { IPhotostrip } from "../models/Photostrip"; // Adjust the import path as necessary
import { Request, Response } from "express";  

const savePhotostripRouter = Router();

savePhotostripRouter.post("/save-photostrip", async (req: Request, res: Response) => {
    const { imageUrls, caption, timestamp } = req.body;
    if (!imageUrls) {
        return res.status(400).json({ error: "Image URLs are required." });
    }
    try {
        const photostrip = await Photostrip.create({
            filename: imageUrls.join(","),
            caption: caption || "",
            timestamp: timestamp || new Date(),
        });
        
        res.send("photostrip saved successfully");
        console.log("Photostrip saved:", photostrip);
        return res.status(201).json({ message: "Photostrip saved successfully." });
    }
    catch (error) {
        console.error("Error saving photostrip:", error);
        return res.status(500).json({ error: "Failed to save photostrip." });
    }
})

export default savePhotostripRouter;