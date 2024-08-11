const Product = require('../models/productmodel'); // Update with the correct path

// Handler to get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.render('admin', { arr: products, domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Handler to create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, quantity, ratingsAverage } = req.body;

    // Check if product with the same name already exists
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return res.status(400).json({ error: 'Product with this name already exists' });
    }

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      quantity,
      ratingsAverage,
      images: req.files ? req.files.map(file => file.path) : [], // Handle file uploads
    });

    await newProduct.save();
    res.redirect('/admin'); // Redirect to admin page or wherever needed
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Handler to update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.files) {
      updates.images = req.files.map(file => file.path); // Handle file uploads
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.redirect('/admin'); // Redirect to admin page or wherever needed
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Handler to delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.redirect('/admin'); // Redirect to admin page or wherever needed
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Error deleting product' });
  }
};

// Handler to move product to edit page
const moveProducttoedit = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.render('adminedit', { product, domainName: 'dxx24bpv-8080.uks1.devtunnels.ms' });
  } catch (err) {
    console.error('Error fetching product for edit:', err);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  moveProducttoedit,
};
