import express from 'express'
import fetch from 'node-fetch'
import bodyParser from 'body-parser'
import cors from 'cors'

const PORT = process.env.PORT
const BASE_URL_NAGER = process.env.BASE_URL_NAGER
const BASE_URL_COUNTRIESNOW = process.env.BASE_URL_COUNTRIESNOW

const app = express()
app.use(bodyParser.json())

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}))

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
    let result = {}

    try {
        const countryInfoResponse = await fetch(`${BASE_URL_NAGER}/CountryInfo/${countryCode}`)
        if (!countryInfoResponse.ok) {
            result.borderCountries = []
        } else {
            const countryInfo = await countryInfoResponse.json()
            result.borderCountries = countryInfo.borders
        }

        const populationResponse = await fetch(`${BASE_URL_COUNTRIESNOW}/countries/population`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ country: name })
        })
        if (!populationResponse.ok) {
            result.population = []
        } else {
            const populationData = await populationResponse.json()
            result.population = populationData.data.populationCounts
        }

        const flagResponse = await fetch(`${BASE_URL_COUNTRIESNOW}/countries/flag/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ iso2: countryCode })
        })
        if (!flagResponse.ok) {
            result.flag = ''
        } else {
            const flagData = await flagResponse.json()
            result.flag = flagData.data.flag
        }

        res.json(result)

    } catch (error) {
        res.status(500).json({ message: 'Error retrieving country data', error: error.message })
    }
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
