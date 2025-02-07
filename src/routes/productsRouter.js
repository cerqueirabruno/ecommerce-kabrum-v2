const express = require('express');
const connection = require('../db/connection/connection');
const { getAll, getById, insert, update } = require('../db/productsDB');
const validateProduct = require('../middlewares/validateProduct');

const router = express.Router();

// ROTAS GET
router.get('/', async (request, response) => {
  try {
    const [result] = await getAll();
    response.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.sqlMessage });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const [[result]] = await getById(id);

    if (result) {
      response.status(200).json(result);
    } else {
      response.status(404).json({ message: 'Produto não encontrada' })
    }

  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.sqlMessage });
  }
});

// ROTAS POST
router.post('/', validateProduct, async (request, response) => {
  const product = request.body;
  
  try {
    const [result] = await insert(product);
    response.status(201).json({
      message: `Produto cadastrado com sucesso com o id ${result.insertId}` });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: 'Ocorreu um erro ao cadastrar uma pessoa' });
  }
});

// ROTAS UPDATE
router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const product = request.body;

  try {
    const [result] = await update(id, product);
    if (result.affectedRows > 0) {
      response.status(200).json({ message: `Produto de id: ${id} atualizado com sucesso` });
    } else {
      response.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    response.status(500).json({ message: error.sqlMessage });
  }
});

// ROTAS DELETE
/*
router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const [result] = await remove(id);
    if (result.affectedRows > 0) {
      response.status(200).json({ message: `Produto de id ${id} removido com sucesso`});
    } else {
      response.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    response.status(500).json({ message: error.sqlMessage });
  }
});
*/

module.exports = router;