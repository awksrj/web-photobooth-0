import express from 'express';
import router from './routes/auth.routes';
import savePhotostripRouter from './routes/photos.routes';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

console.log("JWT_SECRET:", process.env.JWT_SECRET);

const app = express();

// ✅ Add CORS (middleware) BEFORE routes
// because browsers block cross-origin requests (requests coming from a diff domain/port) by default
app.use(cors({
  origin: 'http://localhost:3000', // only allow requests from this 
  methods: ['GET', 'POST'], // only allow GET and POST
  credentials: true, // allows cookies, authorization headers, or TLS client certificates to be sent with requests
}));

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected!!!!"))
  .catch((err) => console.error("MongoDB connection error ❌:", err));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!!!');
});

app.use('/auth', router); // use all the routes defined in router and prefix them with /auth.
app.use('/api', savePhotostripRouter);

app.listen(5050, '0.0.0.0', () => console.log("Server running on port 5050"));
