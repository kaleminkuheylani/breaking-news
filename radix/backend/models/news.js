import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
  {
    baslik: { type: String, required: true },
    metin: { type: String, required: true },
    kategori: {
      type: String,
      enum: ["tarot","manifest","spirituel","web geliştirme","okudugum kitaplar"],
      required: true,
    },
  },
  {
    timestamps: true, // createdAt ve updatedAt otomatik gelir
  }
);

export default mongoose.model("News", newsSchema);


