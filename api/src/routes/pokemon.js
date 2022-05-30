const { Router } = require('express');
const { Pokemon } = require('../db');
const { Tipo } = require('../db');
const axios = require('axios');
const router = Router();

async function consultas(params) {
  return await Promise.all(params.data.results.map(async pokemon => {
    let datos = await axios.get(pokemon.url)
    let { name } = pokemon;
    let imagen = datos.data.sprites.other.dream_world.front_default;
    let tipo = datos.data.types.map(tipo => tipo.type.name);
    return { name, tipo, imagen }
  }))
}

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  if (name) return next();
  let pokemones = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
  let salida = await consultas(pokemones);
  res.json(salida);
});

router.get('/:idPokemon', async (req, res, next) => {
  let { idPokemon } = req.params;
  if (!idPokemon) return res.status(400).send('Faltan datos necesarios');
  if (isNaN(parseInt(idPokemon))) { return res.status(400).send('Formato invalido'); }
  if (idPokemon[0] === '0') {
    idPokemon = parseInt(idPokemon);
    let pokemon = await Pokemon.findByPk(idPokemon, {
      include : {
        model: Tipo,
        through: { attributes: [] }
      }
    });
    if (!pokemon) return res.status(400).send('Pokemon no encontrado')
    return res.status(200).json(pokemon);
  }
  try {
    let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    let { name } = pokemon.data;
    let imagen = pokemon.data.sprites.other.dream_world.front_default;
    let altura = pokemon.data.height;
    let peso = pokemon.data.weight;
    let vida;
    let fuerza;
    let defensa;
    let velocidad;
    pokemon.data.stats.map( value => {
      if (value.stat.name ==='hp') vida = value.base_stat;
      if (value.stat.name ==='attack') fuerza = value.base_stat;
      if (value.stat.name ==='defense') defensa = value.base_stat;
      if (value.stat.name ==='speed') velocidad = value.base_stat;
    })
    let tipo = pokemon.data.types.map(tipo => tipo.type.name);
    res.json({ name, imagen, tipo, altura, peso, vida, fuerza, defensa, velocidad });
  } catch (error) {
    res.status(404).send('ID no encontrado');
  }
});

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  if (!name) return res.status(400).send('Faltan datos necesarios');
  try {
    let pokemon = await Pokemon.findOne({ where: { nombre: name }}, {
      include : {
        model: Tipo,
        through: { attributes: [] }
      }
    });
    if (pokemon) return res.status(200).json(pokemon);
    
    pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    let name1 = pokemon.data.name;
    let imagen = pokemon.data.sprites.other.dream_world.front_default;
    let tipo = pokemon.data.types.map(tipo => tipo.type.name);
    res.json({ name1, imagen, tipo });
  } catch (error) {
    res.status(400).send('Pokemon no encontrado');
  }
});

router.post('/', async (req, res, next) => {
  const { nombre, vida, fuerza, defensa, velocidad, altura, peso, tipo } = req.body;
  if (!nombre || !vida || !fuerza || !defensa || !velocidad || !altura || !peso, !tipo) return res.status(400).send('Faltan datos necesarios');
  if (isNaN(parseInt(vida)) || isNaN(parseInt(fuerza)) || isNaN(parseInt(velocidad)) || isNaN(parseInt(altura)) || isNaN(parseInt(peso)) || !isNaN(parseInt(nombre))) {
    return res.status(400).send('Formato de datos invalido');
  }
  try {
    const pokemon = await Pokemon.create({
      nombre,
      vida,
      fuerza,
      defensa,
      velocidad,
      altura,
      peso
    })
    await tipo.map(async tip => {
      await pokemon.addTipos(tip.id);
    })
    return res.status(201).json(pokemon);
  } catch (error) {
    return res.status(400).send('Error: '+ error);
  }

})


module.exports = router;