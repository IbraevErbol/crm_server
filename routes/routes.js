import express from "express"
import {createProduct, getAllProducts, findProduct, deleteAllProducts, deleteProductById, editByIdProduct, createSale} from "../controllers/controllers.js"
// import ItemServices from "../services/services.js"


const router = express.Router();

//Реализовано 
//добавление
//получения всех данных
//получение данных по айди
//полная очистка данных
//удаление по айди

router.post("/products/add", createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', findProduct);
router.delete('/products', deleteAllProducts);
router.delete('/products/:id', deleteProductById); 
router.patch('/products/:id', editByIdProduct);

router.post('/sales', createSale);

router.get("/ping", (req, res) => {
    res.json({message: 'pong'});
})

export default router;

