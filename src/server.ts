import 'reflect-metadata'
import express from 'express';
import './database'
import { router } from '../routes';

const app = express();

const serverPort: Number = 3333;

app.use(express.json())
app.use(router)

app.listen(serverPort, () => console.log(`Server is running on ${serverPort}!`));

