const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});


// CART PAGE
const cartContainer = document.getElementById('cart-container');
const cartTotal = document.getElementById('cart-total');

if (cartContainer && cartTotal) {

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  function renderCart() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
      cartContainer.innerHTML =
        '<p class="cart-empty">Your cart is empty</p>';

      cartTotal.textContent = '';
      return;
    }

    let total = 0;

    cart.forEach(item => {

      const subtotal = item.price * item.quantity;
      total += subtotal;

      cartContainer.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-details">
            <p>${item.name}</p>
            <p>Price: P${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Subtotal: P${subtotal}</p>
          </div>
        </div>
      `;
    });

    cartTotal.textContent = 'Total: P' + total.toFixed(2);
  }

  // Clear cart
  const clearBtn = document.getElementById('clear-cart');

  if (clearBtn) {
    clearBtn.onclick = () => {
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };
  }

  // Checkout button
  const checkoutBtn = document.getElementById('checkout');

  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      window.location.href = 'checkout.html';
    };
  }

  renderCart();
}
// CHECKOUT PAGE
const summary = document.getElementById('order-summary');
const totalDiv = document.getElementById('order-total');

if (summary && totalDiv) {

  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  let total = 0;

  cart.forEach(item => {

    const subtotal = item.price * item.quantity;
    total += subtotal;

    summary.innerHTML += `
      <div class="summary-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <p>${item.name}</p>
          <p>Qty: ${item.quantity}</p>
          <p>Subtotal: P${subtotal}</p>
        </div>
      </div>
    `;
  });

  totalDiv.textContent = 'Total: P' + total.toFixed(2);

  const checkoutForm = document.getElementById('checkout-form');

  if (checkoutForm) {

    checkoutForm.onsubmit = (e) => {

      e.preventDefault();

      localStorage.removeItem('cart');

      summary.innerHTML = '';
      totalDiv.textContent = '';

      document.getElementById('confirmation').textContent =
        'Thank you! Your order has been placed.';
    };
  }
}
// Feedback form thank-you message
function showFeedbackMessage(event) {
  event.preventDefault(); // stop page reload

  const msg = document.getElementById("feedbackMessage");
  if (msg) {
    msg.classList.add("show");

    // Optional: hide again after 2 seconds
    setTimeout(() => {
      msg.classList.remove("show");
    }, 2000);
  }
}

  