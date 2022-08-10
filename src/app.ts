import express from 'express';
import {jobSchedule} from './job';
const app = express();

app.use(express.json());

jobSchedule();

export default app