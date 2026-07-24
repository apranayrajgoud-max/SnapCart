import { products } from "./products.js";

// ---------- Cart State ----------
let cart = [];

// ---------- Load cart from localStorage ----------
function loadCart() {
  const savedCart = localStorage.getItem('snapcart-cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// ---------- Save cart to localStorage ----------
function saveCart() {
  localStorage.setItem('snapcart-cart', JSON.stringify(cart));
}

// ---------- Add a product to the cart ----------
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  saveCart();
}

// ---------- Increase quantity ----------
function increaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += 1;
    saveCart();
  }
}

// ---------- Decrease quantity (removes item if it hits 0) ----------
function decreaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }
}

// ---------- Remove item from cart entirely ----------
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

// ---------- Clear entire cart ----------
function clearCart() {
  cart = [];
  saveCart();
}

// ---------- Get total number of items ----------
function getCartCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// ---------- Get total price ----------
function getCartTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export {
  cart,
  loadCart,
  saveCart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  getCartCount,
  getCartTotal
};