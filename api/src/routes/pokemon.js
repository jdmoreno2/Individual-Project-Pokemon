const { Router } = require('express');
const { Pokemon } = require('../db');
const { Tipo } = require('../db');
const axios = require('axios');
const {
  DOMAIN, PORT
} = process.env;

const upload = require('../libs/storage')
const router = Router();

async function consultas(params) {
  return await Promise.all(params.data.results.map(async pokemon => {
    let datos = await axios.get(pokemon.url)
    let nombre = pokemon.name;
    let { id } = datos.data;
    let fuerza;
    datos.data.stats.map(value => {
      if (value.stat.name === 'attack') fuerza = value.base_stat;
    });
    let imagen = datos.data.sprites.other.dream_world.front_default;
    let tipos = datos.data.types.map(tipo => tipo.type.name);
    return { id, nombre, tipos, imagen, fuerza }
  }))
}

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  if (name) return next();
  try {
    let pokemons = await Pokemon.findAll({
      include: {
        model: Tipo,
        through: { attributes: [] }
      }
    });
    let pokemones = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
    let salida = await consultas(pokemones);
    res.status(200).json(salida.concat(pokemons));
  } catch (error) {
    res.status(500).send('Error en el servidor ' + error);
  }
});

router.get('/:idPokemon', async (req, res, next) => {
  let { idPokemon } = req.params;
  if (!idPokemon) return res.status(400).send('Faltan datos necesarios');
  if (isNaN(parseInt(idPokemon))) { return res.status(400).send('Formato invalido'); }
  if (idPokemon[0] === '0') {
    idPokemon = parseInt(idPokemon);
    try {
      let pokemon = await Pokemon.findByPk(idPokemon, {
        include: {
          model: Tipo,
          through: { attributes: [] }
        }
      });
      if (!pokemon) return res.status(400).send('Pokemon no encontrado')
      return res.status(200).json(pokemon);
    } catch (error) {
      return res.status(500).json('Error en el servidor ' + error);
    }
  }
  try {
    let pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    let nombre = pokemon.data.name;
    let imagen = pokemon.data.sprites.other.dream_world.front_default;
    let altura = pokemon.data.height;
    let peso = pokemon.data.weight;
    let vida;
    let fuerza;
    let defensa;
    let velocidad;
    pokemon.data.stats.map(value => {
      if (value.stat.name === 'hp') vida = value.base_stat;
      if (value.stat.name === 'attack') fuerza = value.base_stat;
      if (value.stat.name === 'defense') defensa = value.base_stat;
      if (value.stat.name === 'speed') velocidad = value.base_stat;
    });
    let tipos = pokemon.data.types.map(tipo => tipo.type.name);
    res.json({ nombre, imagen, tipos, altura, peso, vida, fuerza, defensa, velocidad });
  } catch (error) {
    res.status(404).send('ID no encontrado');
  }
});

router.get('/', async (req, res, next) => {
  const { name } = req.query;
  if (!name) return res.status(400).send('Faltan datos necesarios');
  try {
    let pokemon = await Pokemon.findOne({
      where: { nombre: name.toLowerCase() },
      include: {
        model: Tipo,
        through: { attributes: [] }
      }
    });
    if (pokemon) return res.status(200).json(pokemon);

    pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    let name1 = pokemon.data.name;
    let { id } = pokemon.data;
    let imagen = pokemon.data.sprites.other.dream_world.front_default;
    let fuerza;
    pokemon.data.stats.map(value => {
      if (value.stat.name === 'attack') fuerza = value.base_stat;
    });
    let tipos = pokemon.data.types.map(tipo => tipo.type.name);
    res.json({ id, nombre: name1, imagen, tipos, fuerza: fuerza });
  } catch (error) {
    res.status(400).send('Pokemon no encontrado');
  }
});

router.post('/', upload.single('imagen'), async (req, res, next) => {
  const { nombre, vida, fuerza, defensa, velocidad, altura, peso, tipo } = req.body;
  const imagen = req.file;
  // console.log(imagen)
  if (!nombre || !vida || !fuerza || !defensa || !velocidad || !altura || !peso || !tipo || !imagen) return res.status(400).send('Faltan datos necesarios');
  if (isNaN(parseInt(vida)) || isNaN(parseInt(fuerza)) || isNaN(parseInt(velocidad)) || isNaN(parseInt(altura)) || isNaN(parseInt(peso)) || !isNaN(parseInt(nombre))) {
    return res.status(400).send('Formato de datos invalido');
  }
  try {
    const pokemon = await Pokemon.create({
      nombre: nombre.toLowerCase(),
      vida,
      fuerza,
      defensa,
      velocidad,
      altura,
      peso,
      imagen: imagen.path
    })
    await tipo.map(async tip => {
      await pokemon.addTipos(tip);
    })
    const tipos = await Promise.all(tipo.map(async tip => {
      return await Tipo.findOne({ where: { id: tip } });
    }));
    return res.status(201).json({ id: pokemon.id, nombre: pokemon.nombre, imagen: pokemon.imagen, fuerza: pokemon.fuerza, tipos: tipos });
  } catch (error) {
    return res.status(400).send('Error: ' + error);
  }

})


module.exports = router;