require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./server/data/utils/db.js");

mongoose.connect(process.env.DB_LINK, {
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error.message);
});

// Import DAO modules
const CartDao = require("./server/data/mongo/carts.dao.js");
const ProductDao = require("./server/data/mongo/products.dao.js");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Set up Handlebars as the view engine
const hbs = exphbs.create({
  defaultLayout: 'main',
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Modify GET /api/products to handle filters, pagination, and sorting
app.get("/api/products", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    // Define the filter based on the query parameter
    const filter = query ? { /* Define your filter criteria based on the query */ } : {};

    // Use the ProductDao or ProductMemoryManager to fetch products based on the provided parameters
    const products = await ProductDao.getProducts({ filter, limit, page, sort });

    // Calculate pagination details
    const totalProducts = await ProductDao.countProducts(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Construct the response object
    const response = {
      status: "success",
      payload: products,
      totalPages,
      prevPage: hasPrevPage ? page - 1 : null,
      nextPage: hasNextPage ? page + 1 : null,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}` : null,
      nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}` : null,
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Add new routes for product and cart management
app.delete("/api/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    // Use the CartDao or CartMemoryManager to handle product deletion from the cart
    const updatedCart = await CartDao.removeProductFromCart(cartId, productId);

    io.emit("cartUpdated", { cartId, updatedCart });
    res.json({ status: "success", response: updatedCart });
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.put("/api/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body.products; // Assuming products is an array of product objects

    // Use the CartDao or CartMemoryManager to handle cart update with the provided products
    const updatedCart = await CartDao.updateCart(cartId, products);

    io.emit("cartUpdated", { cartId, updatedCart });
    res.json({ status: "success", response: updatedCart });
  } catch (error) {
    console.error("Error updating cart:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.put("/api/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    // Use the CartDao or CartMemoryManager to handle updating the quantity of a specific product in the cart
    const updatedCart = await CartDao.updateProductQuantity(cartId, productId, quantity);

    io.emit("cartUpdated", { cartId, updatedCart });
    res.json({ status: "success", response: updatedCart });
  } catch (error) {
    console.error("Error updating product quantity in cart:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.delete("/api/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Use the CartDao or CartMemoryManager to handle deleting the entire cart
    await CartDao.deleteCart(cartId);

    io.emit("cartUpdated", { cartId, updatedCart: null });
    res.json({ status: "success", message: "Cart deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// Add routes for viewing all products and a specific cart
app.get("/views/products", async (req, res) => {
  try {
    // Use the ProductDao or ProductMemoryManager to fetch all products
    const products = await ProductDao.getAllProducts();

    res.render("products", { products });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

app.get("/views/carts/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid;

    // Use the CartDao or CartMemoryManager to fetch the details of a specific cart
    const cart = await CartDao.getCart(cartId);

    res.render("cart", { cart });
  } catch (error) {
    console.error("Error fetching cart details:", error.message);
    res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
});

// ... (existing code)

// Start the server
const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
