import Product from "../models/productModel.js";
/* PUBLIC */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "published" })
      .select("name slug category description displaySpecs brochureUrl");

    res.json({
      success: true,
      data: products
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}; 

export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find({ status: ["draft", "published","archived"] })
      .select("name slug category description displaySpecs status brochureUrl");

    res.json({
      success: true,
      data: products
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      status: "published"
    });

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    res.json({ success: true, data: product });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const createProduct = async (req, res) => {
  try {
    const {name,displaySpecs,allSpecs,brocherUrl} = req.body;
    const obj = {
      name,displaySpecs,allSpecs,brocherUrl
    };
    const product = await Product.create(obj);

    res.status(201).json({
      success: true,
      data: product
    });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ success: true, data: updated });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Deleted" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
