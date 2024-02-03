const express = require('express');
const ProductManager = require('./productManager'); 
const app = express();
const port = 8080;
const productManager = new ProductManager('./product.json');

app.get('/products', async (req, res) => {
    try {
        await productManager.init();
        let products = await productManager.getProducts();

        if (req.query.limit) {
            products = products.slice(0, Number(req.query.limit));
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        await productManager.init();
        const product = await productManager.getProductById(Number(req.params.pid));

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
