const axios = require('axios');
const { Router } = require('express');
const { Tipo } = require('../db');
const router = Router();

async function registrarTipos(Tipos) {
  await Promise.all(Tipos.map( async tipo => {
    await Tipo.create({
      nombre: tipo.name
    });
  }))
}

router.get('/', async (req, res, next) => {
  const {data} = await axios.get('https://pokeapi.co/api/v2/type');
  registrarTipos(data.results);
  return res.status(200).send('Tipos creados');
})


module.exports = router;