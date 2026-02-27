import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import config from './config';
import router from './router';

dotenv.config();
const app = express();
const port = config.port;

app.use(cors({
  origin: 'http://localhost:5173/'
}));
app.use(express.json());
app.use(router);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
