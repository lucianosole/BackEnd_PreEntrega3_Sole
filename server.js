const express = require("express");
const app = express();
const port = 3000;

const ProductManager = require("./ProductManager");
const productManager = new ProductManager("productos.JSON");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenidos a la Tienda");
});

app.get("/products", async (req, res) => {
  let limit = req.query.limit;

  if (!limit) {
    const products = await productManager.getProducts();
    res.send(products);
  } else {
    const products = await productManager.getProducts(limit);
    res.send(products);
  }
});

app.get("/products/:productId", async (req, res) => {
  const product = await productManager.getProductById(
    parseInt(req.params.productId)
  );
  res.send(product);
});

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`);
});
