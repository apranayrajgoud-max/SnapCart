// ---------- DOM References ----------
const checkoutItemsContainer = document.getElementById('checkout-items');
const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
const checkoutTotalEl = document.getElementById('checkout-total');
const placeOrderBtn = document.getElementById('place-order-btn');
const orderView = document.getElementById('order-view');
const confirmationView = document.getElementById('confirmation-view');
const orderIdEl = document.getElementById('order-id');

// ---------- Render Order Summary ----------
function renderCheckout() {
  checkoutItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    checkoutItemsContainer.innerHTML = '<p style="text-align:center; color:#7d8bab;">Your cart is empty.</p>';
    placeOrderBtn.disabled = true;
    placeOrderBtn.style.opacity = '0.5';
    placeOrderBtn.style.cursor = 'not-allowed';
    return;
  }

  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'checkout-item';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="checkout-item-details">
        <h4>${item.name}</h4>
        <p>Qty: ${item.quantity} × ₹${item.price}</p>
      </div>
      <p class="checkout-item-total">₹${item.price * item.quantity}</p>
    `;
    checkoutItemsContainer.appendChild(row);
  });

  const total = getCartTotal();
  checkoutSubtotalEl.textContent = `₹${total}`;
  checkoutTotalEl.textContent = `₹${total}`;
}

// ---------- Place Order ----------
placeOrderBtn.addEventListener('click', () => {
  if (cart.length === 0) return;

  const orderId = 'SE-' + Math.floor(100000 + Math.random() * 900000);
  orderIdEl.textContent = `Order ID: ${orderId}`;

  clearCart();

  orderView.style.display = 'none';
  confirmationView.style.display = 'flex';
});

// ---------- Initialize ----------
loadCart();
renderCheckout();