import * as ProductServices from "../services/services.js";
import * as SaleService from "../services/sale.services.js"

export const createProduct = async (req, res) => {
    try {
        const { article, barcode, name } = req.body;
        const existingArticle = await ProductServices.findByField("article", article);
        if (existingArticle)
            return res.status(400).json({ message: `Товар с артикулом "${article}" уже существует.` });

        if (barcode) {
            const existingBarcode = await ProductServices.findByField("barcode", barcode);
            if (existingBarcode)
                return res.status(400).json({ message: `Товар со штрихкодом "${barcode}" уже существует.` });
        }

        if (name) {
            const existingName = await ProductServices.findByField("name", name);
            if (existingName) {
                return res.status(400).json({ message: `Товар с таким именем "${name}" уже существует.` });
            }
        }
        const product = await ProductServices.createProduct(req.body);
        res.json(product);
    } catch (error) {
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ message: `Товар с таким ${field} уже существует.` });
        }
        res.status(500).json({ message: "Add error", error: error.message });

    }
}

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await ProductServices.getAllProducts();
        res.json(allProducts);
    } catch (error) {
        res.status(500).json({ message: "Get error", error });
    }
}

export const findProduct = async (req, res) => {
    try {
        const product = await ProductServices.findProduct(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "find error", error });
    }
}
export const deleteProductById = async (req, res) => {
    try {
        const removed = await ProductServices.deleteById(req.params.id);
        if (!removed) return res.status(404).json({ message: "Product not found!" });
        res.json({ message: "Product deleted", removed })
    } catch (error) {
        res.status(500).json({ message: "delete by id error", error });
    }
}
export const deleteAllProducts = async (req, res) => {
    try {
        const cleared = await ProductServices.deleteAllProduct();
        res.json({ message: "All items deleted", items: cleared });
    } catch (error) {
        res.status(500).json({ message: "delete all error", error });
    }
};
export const editByIdProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const update = await ProductServices.editById(id, req.body);

        if (!update) return res.status(404).json({ message: "Product not found!" })

        res.json({ message: "Product updated", update })
    } catch (error) {
        res.status(500).json({ message: "update by id error", error });
    }
}

export const createSale = async (req, res) => {
    try {
        const sale = await SaleService.createSaleService(req.body);

        res.status(201).json({
            message: "Продажа завершена",
            sale
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "Ошибка оплаты"
        });
    }
};