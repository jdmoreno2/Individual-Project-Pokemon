const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemon = require('./pokemon');
const tipo = require('./tipo');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemon);
router.use('/types', tipo);

module.exports = router;
