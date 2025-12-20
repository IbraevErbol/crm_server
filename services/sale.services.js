import Sale from "../models/sale.js";
import Product from "../models/product.js";

export const createSaleService = async ({ items, paymentType }) => {
  if (!items || items.length === 0) {
    throw new Error("Корзина пуста");
  }

  let total = 0;

  // 1️⃣ проверка товаров
  for (const item of items) {
    const product = await Product.findById(item.productId);

    if (!product) {
      throw new Error(`Товар не найден`);
    }

    if (product.quantity < item.quantity) {
      throw new Error(`Недостаточно товара: ${product.name}`);
    }

    total += item.price * item.quantity;
  }

  // 2️⃣ создаём чек
  const sale = await Sale.create({
    items,
    total,
    paymentType
  });

  // 3️⃣ уменьшаем остатки
  for (const item of items) {
    await Product.findByIdAndUpdate(item.productId, {
      $inc: { quantity: -item.quantity }
    });
  }

  return sale;
};
