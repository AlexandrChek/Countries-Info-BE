import express from 'express';
import cors from 'cors';
import { PORT } from './envVars.js';
import { getCountryList, getCountryInfo } from './handlers.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/countries', getCountryList);
app.post('/api/country-info', getCountryInfo);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});
