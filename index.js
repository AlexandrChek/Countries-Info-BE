import express from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'

const PORT = process.env.PORT
const BASE_URL_NAGER = process.env.BASE_URL_NAGER
const BASE_URL_COUNTRIESNOW = process.env.BASE_URL_COUNTRIESNOW

const app = express()
app.use(bodyParser.json())

// 1. GET /api/countries
app.get('/api/countries', async (req, res) => {
    try {
        const response = await fetch(`${BASE_URL_NAGER}/AvailableCountries`)
        const countries = await response.json()
        res.json(countries)
    } catch (error) {
        res.status(500).json({ message: 'Error getting countries', error: error.message })
    }
})

// 2. POST /api/country-info
app.post('/api/country-info', async (req, res) => {
    const { countryCode, name } = req.body

    try {
        const countryInfoResponse = await fetch(`${BASE_URL_NAGER}/CountryInfo/${countryCode}`)
        const countryInfo = await countryInfoResponse.json()
        const borders = countryInfo.borders

        const populationResponse = await fetch(`${BASE_URL_COUNTRIESNOW}/countries/population`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: name })
        })
        const populationData = await populationResponse.json()
        const populationCounts = populationData.data.populationCounts

        const flagResponse = await fetch(`${BASE_URL_COUNTRIESNOW}/countries/flag/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ iso2: countryCode })
        })
        const flagData = await flagResponse.json()
        const flagUrl = flagData.data.flag

        res.json({
            borderCountries: borders,
            population: populationCounts,
            flag: flagUrl
        })
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving country data', error: error.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server started`)
})
