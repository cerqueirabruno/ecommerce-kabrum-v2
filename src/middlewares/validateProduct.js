const validateProduct = (req, res, next) => {
  const { name, value, description, stock } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório e deve ser uma string.' });
  }

  if (value === undefined || typeof value !== 'number' || value <= 0) {
    return res.status(400).json({ message: 'O campo "value" é obrigatório e deve ser um número maior que zero.' });
  }

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ message: 'O campo "description" é obrigatório e deve ser uma string.' });
  }

  if (stock === undefined || typeof stock !== 'number' || stock < 0) {
    return res.status(400).json({ message: 'O campo "stock" é obrigatório e deve ser um número maior ou igual a zero.' });
  }

  next();
};

module.exports = validateProduct;
