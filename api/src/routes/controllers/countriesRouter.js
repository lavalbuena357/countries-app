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
            name: `${el.translations.es || el.name}`,
            flag: el.flag,
            continent: el.region,
            capital: el.capital,
            subregion: el.subregion,
            area: el.area,
            population: el.population,
            demonym: el.demonym,
            timezones: el.timezones,
            borders: el.borders,
            currencies: el.currencies,
            languages: el.languages,
            latlng: el.latlng
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

//find by id
router.get('/:idCountry', async (req, res) => {
  const idCountry = req.params.idCountry;
  const id = idCountry.toUpperCase();

  try {
    let countries = await Country.findByPk(id,{
      attributes: ['id', 'name', 'flag', 'continent', 'capital', 'subregion', 'area', 'population', 'demonym', 'timezones', 'borders', 'currencies', 'languages', 'latlng']
    });
    return countries ? res.json(countries) : res.status(404).json({error: 'Invalid Country Code'})
  } catch(err) {console.log(err)}
});

module.exports = router;