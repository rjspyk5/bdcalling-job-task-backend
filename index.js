const express = require("express");
const connectDb = require("./config/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userControllar = require("./controllar/userControllar");
const categoryControllar = require("./controllar/categoryControllar");
const productControllar = require("./controllar/productControllar");
const app = express();
const port = process.env.PORT ?? 3001;
require("dotenv").config();

// cors setup
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

// connect Database
connectDb();

// middleware
app.use(cookieParser());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// user related routes
app.get("/api/v1/users", userControllar.getUser);
app.post("/api/v1/users/register", userControllar.register);
app.put("/api/v1/users/profile", userControllar.updateProfile);
app.put("/api/v1/users/:id", userControllar.updateUser);

// category related api
app.get("/api/v1/category", categoryControllar.getCategory);
app.get("/api/v1/category/:id", categoryControllar.getCategory);
app.delete("/api/v1/category/:id", categoryControllar.deleteCategory);
app.put("/api/v1/category/:id", categoryControllar.updateCategory);
app.post("/api/v1/category", categoryControllar.createCategory);

// product related api
app.get("/api/v1/products", productControllar.getProduct);
app.get("/api/v1/products/:id", productControllar.getProduct);
app.delete("/api/v1/products/:id", productControllar.deleteProduct);
app.put("/api/v1/products/:id", productControllar.updateProduct);
app.post("api/v1/products", productControllar.addProduct);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
