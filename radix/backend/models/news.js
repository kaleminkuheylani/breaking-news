import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    baslik: { type: String, required: true },
    metin: { type: String, required: true },
    kategori: {
      type: String,
      enum: ["dünya", "siyaset", "futbol", "dizi", "sinema", "magazin"],
      required: true,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt otomatik gelir
  }
);

export default mongoose.model("News", newsSchema);
