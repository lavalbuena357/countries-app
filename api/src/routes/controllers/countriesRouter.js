const express = require('express');
const { Country } = require('../../db');
const axios = require('axios');
const { Sequelize } = require('sequelize');
const router = express.Router();

//Middleware
router.use(express.json());

//Middleaware populate DB
router.use(async (req, res, next) => {
  try {
    const count = await Country.count()
      if(!count) {
        const api = await axios.get('https://restcountries.eu/rest/v2/all');
        await api.data.forEach(el => Country.findOrCreate({
          where: {
            id: el.alpha3Code,
            name: el.name,
            flag: el.flag,
            continent: el.region,
            capital: el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population
          }
        }))
      }; next();
  } catch(err) {console.log(err)}
})

//routes
router.get('/', async (req,  res) => {
  try {
    let countries;
    countries = await Country.findAndCountAll({
      attributes: ['id', 'name', 'flag', 'continent', 'population']
    })
    return res.json(countries)
  } catch(err) {console.log(err)}
})

module.exports = router;