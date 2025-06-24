import { Router, Request, Response } from "express";
import Photostrip from "../models/Photostrip";

const savePhotostripRouter = Router();

interface PhotostripRequestBody {
  imageUrls: [string];
  caption?: string;
  timestamp?: Date;
}

savePhotostripRouter.post("/save-photostrip", async (req: Request, res: Response) => {
    const { imageUrls, caption, timestamp } = req.body as PhotostripRequestBody;

    if (!imageUrls) {
        return res.status(400).json({ error: "Image URLs are required." });
    }
    try {
        const photostrip = await Photostrip.create({
            filename: imageUrls.join(","), // consider renaming this field
            caption: caption || "",
            timestamp: timestamp || new Date(),
        });
        return res.status(201).json({ message: "Photostrip saved successfully." });
    } catch (error) {
        console.error("Error saving photostrip:", error);
        return res.status(500).json({ error: "Failed to save photostrip." });
    }
});

export default savePhotostripRouter;
