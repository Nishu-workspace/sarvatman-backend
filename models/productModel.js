import mongoose from "mongoose";

const productSchema = mongoose.Schema({

    name: {
    type:String
    } ,
    slug: String
    ,
    category:String
    ,
    description:String
    ,
   
  displaySpecs: {
    type: Map,
    of: String,
    default: {}
  },

  allSpecs: {
    type: Map,
    of: String,
    default:{}
  },

  brochreUrl: String,

    status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
    index: true
  }

},{timestamps:true});

productSchema.index({ name: "text", category: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;