import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        price: Number,   // цена НА МОМЕНТ ПРОДАЖИ
        quantity: Number
      }
    ],

    total: {
      type: Number,
      required: true
    },

    paymentType: {
      type: String,
      enum: ["cash", "card"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Sale", SaleSchema);
