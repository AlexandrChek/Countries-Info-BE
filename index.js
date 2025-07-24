import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import {
  getEnvVariables,
  compareNames,
  fixNamesMismatch,
  changeKeysInBorderCountries,
} from './functions.js';

const { PORT, BASE_URL_NAGER, BASE_URL_COUNTRIESNOW } = getEnvVariables();

const app = express();

app.use(cors());
app.use(express.json());

// 1. GET /api/countries
app.get('/api/countries', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL_NAGER}/AvailableCountries`);
    let countries = await response.json();
    countries.sort(compareNames);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Error getting countries', error: error.message });
  }
});

// 2. POST /api/country-info
app.post('/api/country-info', async (req, res) => {
  const { countryCode, name } = req.body;
  const correctName = fixNamesMismatch(name);
  let result = {};

  try {
    const countryInfoResponse = await fetch(`${BASE_URL_NAGER}/CountryInfo/${countryCode}`);
    if (!countryInfoResponse.ok) {
      result.borderCountries = [];
    } else {
      const countryInfo = await countryInfoResponse.json();
      result.borderCountries = changeKeysInBorderCountries(countryInfo.borders);
    }

    const populationResponse = await fetch(`${BASE_URL_COUNTRIESNOW}/countries/population`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: correctName }),
    });
    if (!populationResponse.ok) {
      result.population = [];
    } else {
      const populationData = await populationResponse.json();
      result.population = populationData.data.populationCounts;
    }

    const flagResponse = await fetch(`${BASE_URL_COUNTRIESNOW}/countries/flag/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ iso2: countryCode }),
    });
    if (!flagResponse.ok) {
      result.flag = '';
    } else {
      const flagData = await flagResponse.json();
      result.flag = flagData.data.flag;
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving country data', error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});
