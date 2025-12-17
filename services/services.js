import Product from "../models/product.js";

export async function createProduct(data) {
    return await Product.create(data);
}

export async function getAllProducts() {
    return await Product.find();
}

export async function findProduct(id) {
    return await Product.findById(id);
}

export async function findByField(field, value) {
    const query = {};
    query[field] = value;
    return await Product.findOne(query);
}

export async function deleteById(id) {
    return await Product.findByIdAndDelete(id);
}

export async function deleteAllProduct() {
    return await Product.deleteMany({})
}
//Сервис изменения данных 
export async function editById(id, data) {
    return await Product.findByIdAndUpdate(
        id,
        data,
        {new: true}
    );
}