const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = path.resolve(filePath);
        this.products = [];
        this.nextId = 1;
    }

    async init() {
        try {
            try {
                const data = await fs.readFile(this.path, 'utf8');
                this.products = JSON.parse(data);
                if (this.products.length > 0) {
                    this.nextId = this.products[this.products.length - 1].id + 1;
                }
            } catch (error) {
                if (error.code === 'ENOENT') {
                    await fs.writeFile(this.path, JSON.stringify([]));
                } else {
                    throw error;
                }
            }
        } catch (error) {
            throw new Error("Error al inicializar los datos: " + error.message);
        }
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        const fields = [title, description, price, thumbnail, code, stock];
        if (fields.some(field => field === undefined)) {
            throw new Error("Error, campos son obligatorios, complete los campos \n");
        }

        if (this.products.some(product => product.code === code)) {
            throw new Error("Error, Upss! Este producto ya existe \n");
        }

        const newProduct = { id: this.nextId++, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);
        await this.saveProducts();
    }

    async saveProducts() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            throw new Error("Error al guardar los productos: " + error.message);
        }
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error("Error al obtener los productos: " + error.message);
        }
    }

    async getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Sorry, el producto no ha sido encontrado \n");
        }
        return product;
    }

    async updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error("Producto no encontrado para actualizar");
        }

        // Actualiza los campos pero mantener el id original
        this.products[index] = { ...this.products[index], ...updatedProduct, id: this.products[index].id };

        await this.saveProducts();
    }

    async deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error("Producto no encontrado para eliminar");
        }

        this.products.splice(index, 1);
        await this.saveProducts();
    }
}

module.exports = ProductManager;
