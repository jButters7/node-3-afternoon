require('dotenv').config()
const express = require('express');
const massive = require('massive');
const productsCtrl = require('../productsController/products_controller')

const { SERVER_PORT, CONNECTION_STRING } = process.env

const app = express();

app.use(express.json())


app.get('/api/products', productsCtrl.getAll)
app.get('/api/products/:id', productsCtrl.getOne)
app.post('/api/products', productsCtrl.create)
app.put('/api/products/:id', productsCtrl.update)
app.delete('/api/products/:id', productsCtrl.delete)



massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
}).then(dbInstance => {
  app.set('db', dbInstance)
  console.log('DB Ready')
  app.listen(SERVER_PORT, () => {
    console.log(`I hear you ${SERVER_PORT}.`);
  });
}).catch(err => console.log(err));
