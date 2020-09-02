module.exports = {
  create: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { name, description, price, image_url } = req.body


    dbInstance.create_product([name, description, price, image_url])
      .then(() => { res.sendStatus(200) })
      .catch(() =>
        res.status(500).send(`Couldn't create a new product`))
  },
  getAll: (req, res, next) => {
    const dbInstance = req.app.get('db');

    dbInstance.read_products()
      .then(products => res.status(200).send(products))
      .catch(() => {
        res.status(500).send(`Couldn't get all products`)
      })

  },
  getOne: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { id } = req.params

    dbInstance.read_product([id])
      .then(product => res.status(200).send(product))
      .catch(() => res.status(500).send(`Couldn't get that product`))
  },

  update: (req, res, next) => {
    const dbInstance = req.app.get('db');
    // const { id } = req.params
    // const { name, description, price, image_url } = req.body
    const { params, query } = req;

    dbInstance.update_product([params.id, query.desc])
      .then(() => res.sendStatus(200))
      .catch(() => {
        res.status(500).send(`Couldn't update that product`)
      });
  },

  delete: (req, res, next) => {
    const dbInstance = req.app.get('db');
    const { id } = req.params

    dbInstance.delete_product([id])
      .then(() => res.sendStatus(200))
      .catch(() => res.status(500).send(`Couldn't delete product`))
  }
}