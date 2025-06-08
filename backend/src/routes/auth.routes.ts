const router = require('express').Router();
const User = require('./models/User.ts');
const bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// Register
router.post('/register', async (req: Request, res: Response) => {
    const { name, email, password, accountName, birthYear } = req.body;

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
            { id: user._id, email: user.email, accName: user.accName },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        )
        res.send({ message: "user registered!"});
    }
    catch (err) {
        res.status(500).json({ error: "registration failed", details: err})
    }
})

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(401).send("Invalid account!");
    }

    const token = jwt.sign(
        { id: user._id, email: user.email, accName: user.accName}, 
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );
    res.json({ token })
})