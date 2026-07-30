import fetch from 'node-fetch';
import { fixNamesMismatch, changeKeysInBorderCountries } from './functions.js';
import { BASE_URL_NAGER, BASE_URL_COUNTRIESNOW } from './envVars.js';

//-----------------------------------------------------------------------------------------

export const getCountryList = async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL_NAGER}/AvailableCountries`);
    let countries = await response.json();
    countries.sort((a, b) => (a.name < b.name ? -1 : 1));
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Error getting countries', error: error.message });
  }
};
//-----------------------------------------------------------------------------------------

export const getCountryInfo = async (req, res) => {
  try {
    const { countryCode, name } = req.body;
    let result = {};

    // Get border country list
    const countryInfoResponse = await fetch(`${BASE_URL_NAGER}/CountryInfo/${countryCode}`);

    if (!countryInfoResponse.ok) {
      result.borderCountries = [];
    } else {
      const countryInfo = await countryInfoResponse.json();
      result.borderCountries = changeKeysInBorderCountries(countryInfo.borders);
    }

    // Get population data
    const correctName = fixNamesMismatch(name);
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

    // Get the flag
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
};
