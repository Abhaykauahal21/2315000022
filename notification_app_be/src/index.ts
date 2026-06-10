import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {
  requestLogger,
  responseLogger,
  errorLogger,
  executionTimeLogger,
} from './middleware';
import routes from './routes';
import { logInfo } from 'logging-middleware';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(responseLogger);
app.use(executionTimeLogger);
app.use(routes);
app.use(errorLogger);

app.listen(PORT, () => {
  logInfo(`Server running on http://localhost:${PORT}`);
});
