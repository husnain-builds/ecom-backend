const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const User = require("./models/User.js"); 
const product_routes = require("./routes/products");


const app = express();

// Middleware
app.use(express.json()); // to parse JSON
app.use(cors());


// Simple route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


// middleware 
app.use("/api/products", product_routes)


// Add a user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Create user
    const user = new User({
      name,
      email,
      password, // gets hashed automatically by pre("save")
      address,
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully 🚀",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get all users
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const start = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();

