// models/User.js
const mongoose = require("mongoose");
const bcrypt = require ("bcrypt");

const AddressSchema = new mongoose.Schema({
  label: { type: String, required: true },
  fullName: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: String,
  postalCode: String,
  country: { type: String, required: true },
  phone: String,
}, {_id: false});

const userSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  password: {type: String, required: true, select: false},
  role: {type: String, enum: ["user","admin"], default: "user"},
  address: [AddressSchema],
  orderHistory: [{type: mongoose.Schema.Types.ObjectId, ref: "Order"},]
}, {timestamps: true});

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  const saltrounds = Number(10);
  this.password = await bcrypt.hash(this.password, saltrounds);
  next(); 
});

userSchema.methods.comparePassword = function(candidate){
  return bcrypt.compare(candidate, this.password);
}

module.exports = mongoose.model("User", userSchema);
