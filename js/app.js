// ---------- DOM References ----------
const productGrid = document.getElementById('product-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountEl = document.getElementById('cart-count');
const cartTotalEl = document.getElementById('cart-total');
const cartToggleBtn = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const checkoutBtn = document.getElementById('checkout-btn');
const cartOverlay = document.getElementById('cart-overlay');

// ---------- Render Products ----------
function renderProducts(productList) {
  productGrid.innerHTML = '';

  if (productList.length === 0) {
    productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#7d8bab;">No products found.</p>';
    return;
  }

  productList.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">₹${product.price}</p>
        <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    productGrid.appendChild(card);
  });

  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.getAttribute('data-id'));
      addToCart(id);
      renderCart();
    });
  });
}

// ---------- Render Cart ----------
function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align:center; color:#7d8bab;">Your cart is empty.</p>';
  } else {
    cart.forEach(item => {
      const cartItemEl = document.createElement('div');
      cartItemEl.className = 'cart-item';
      cartItemEl.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>₹${item.price} x ${item.quantity}</p>
          <div class="qty-controls">
            <button class="decrease-btn" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="increase-btn" data-id="${item.id}">+</button>
          </div>
          <button class="remove-item-btn" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(cartItemEl);
    });
  }

  cartCountEl.textContent = getCartCount();
  cartTotalEl.textContent = getCartTotal();

  document.querySelectorAll('.increase-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      increaseQuantity(parseInt(btn.getAttribute('data-id')));
      renderCart();
    });
  });

  document.querySelectorAll('.decrease-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      decreaseQuantity(parseInt(btn.getAttribute('data-id')));
      renderCart();
    });
  });

  document.querySelectorAll('.remove-item-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      removeFromCart(parseInt(btn.getAttribute('data-id')));
      renderCart();
    });
  });
}

// ---------- Populate Category Filter Dropdown ----------
function populateCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

// ---------- Search & Filter Logic ----------
function applyFilters() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

searchInput.addEventListener('input', applyFilters);
categoryFilter.addEventListener('change', applyFilters);

// ---------- Cart Sidebar Toggle ----------
cartToggleBtn.addEventListener('click', () => {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('active');
});

closeCartBtn.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('active');
});

cartOverlay.addEventListener('click', () => {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('active');
});

// ---------- Checkout Button ----------
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  window.location.href = 'checkout.html';
});

// ---------- Initialize App ----------
function init() {
  loadCart();
  populateCategories();
  renderProducts(products);
  renderCart();
}

init();