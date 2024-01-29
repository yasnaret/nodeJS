class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        // Validacion
        const fields = [title, description, price, thumbnail, code, stock];
        if (fields.some(field => field === undefined)) {
            throw new Error("Error,campos son obligatorios, complete los campos \n");
        }

        // Validación de código 
        if (this.products.some(product => product.code === code)) {
            throw new Error("Error,Upss!Este producto ya existe \n");
        }

        const newProduct = { id: this.nextId++, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error("Sorry,el producto no ha sido  encontrado \n");
        }
        return product;
    }
}

module.exports = ProductManager;


