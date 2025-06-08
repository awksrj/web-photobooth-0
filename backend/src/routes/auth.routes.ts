import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const express = require("express");
const router = express.Router();

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
  accountName: string;
  birthYear?: number;
}

// Register
router.post(
    '/register', 
    async (req: Request, res: Response) => {
        const { name, email, password, accountName, birthYear } = req.body as RegisterRequestBody;
        if (!name || !email || !password || !accountName) {
            return res.status(400).json({ error: "missing required fields!"});
        }
        const hashed = await bcrypt.hash(req.body.password, 10);
        const user = new User({ name,
            email,
            password: hashed,
            accountName,
            birthYear: birthYear || null});
        try {
            await user.save();

            // generate token with more info
            const token = jwt.sign(
                { id: user._id, email: user.email, accName: user.accountName },
                process.env.JWT_SECRET!,
                { expiresIn: '7d' }
            );
            return res.send({ message: "user registered!", token });
        }
        catch (err) {
            return res.status(500).json({ error: "registration failed", details: err });
        }
});

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).send("Invalid account!");
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, accName: user.accountName }, 
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );
    return res.json({ token });
});

export default router;