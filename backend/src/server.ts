import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected"));
app.use('/api/auth', require('./routes/auth').default || require('./routes/auth'));
app.use('/api/photos', require('./routes/photos').default || require('./routes/photos'));
app.use('/api/photos', require('./routes/photos'));

// app.get("/", (_req, res) => {
//   res.send("API is running");
// });

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
