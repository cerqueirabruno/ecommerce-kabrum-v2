// const fs = require('fs');
// const path = require('path');
const express = require('express');
const morgan = require('morgan');

const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const ordersRouter = require('./routes/ordersRouter');
// const addressRouter = require('./routes/addressRouter');

// INVOCAÇÕES
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan('combined'));

// ROTA RAIZ
app.get('/', (request, response) => {
  response.status(200).json({ message: 'Olá Mundo!' })
});

// ROTA APP
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
// app.use('/address', addressRouter);

// ROTA ARQUIVOS ESTÁTICOS (IMAGENS)

// ROTA LEITURA E ESCRITA DE ARQUIVOS

// ROTA ERRO
app.use((error, request, response, next) => {
  console.error(error.stack);
  next(error);  
});

app.use((error, request, response, next) => {
  response.status(500).json({ message: "DEU RUIM!" });
});

// EXPORTAÇÃO DO APP
module.exports = app;

// docker run --name kabrum_database -e MYSQL_ROOT_PASSWORD=123456 -d -p 3306:3306 mysql:latest
// docker exec -it kabrum_database bash
// mysql -u root -p