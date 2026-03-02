import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './router';
import connectDb from './models';

dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT;

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(router);


(async function bootstrap() {
  await connectDb();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
