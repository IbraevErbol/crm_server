import mongoose from "mongoose";

//В будущем проверить где поставить required: true, unique: true  

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    price: { type: Number, required: true },
    costPrice: { type: Number, default: 0 },   // себестоимость
    article: { type: String, unique: true },   // артикул
    barcode: { type: String, unique: true },   // штрихкод
    quantity: { type: Number, default: 0 },    // остаток
    category: { type: String },
    description: { type: String },
    images: [String],                          // массив ссылок
    discount: { type: Number, default: 0 },    // %
    soldCount: { type: Number, default: 0 }    // всего продано
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);
