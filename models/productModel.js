import mongoose from "mongoose";

const productSchema = mongoose.Schema({

  name: {
    type: String
  },
  slug: String,
  tagline: String,
  category: String,
  description: String,

  features: [{ type: String }],

  displaySpecs: {
    type: Map,
    of: String,
    default: {}
  },


  imageUrl: String,
  brochureUrl: String,
  public_id: String,
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
    index: true
  }

}, { timestamps: true });

productSchema.index({ name: "text", category: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;