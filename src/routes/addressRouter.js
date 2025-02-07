const express = require('express');

const router = express.Router();

router.post('/', async (request, response) => {

  const { id } = request.params;
  const { street, district, city, country, zip_code } = request.body;
  
  try {
    // const [result] = await register(street, district, city, country, zip_code);
    // response.status(200).json(result);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.sqlMessage });
  }
});

module.exports = router;