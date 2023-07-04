const fs = require("fs/promises");
const path = require("path");

class ProductManager {
  constructor(filename) {
    this.filename = filename;
    this.filePath = path.join(__dirname, this.filename);
    this.products = [];
  }

  async getProducts(limit) {
    const data = await fs.readFile(this.filePath, "utf-8");
    const products = JSON.parse(data);
    if (limit) {
      return products.slice(0, limit);
    }
    return products;
  }

  async getProductById(id) {
    const data = await fs.readFile(this.filePath, "utf-8");
    const products = JSON.parse(data);
    const product = products.find((product) => product.id === id);
    return product;
  }
}

module.exports = ProductManager;
