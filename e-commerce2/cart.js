const cartTableBody = document.querySelector('#cart-container tbody');
const subtotalEl = document.getElementById('subtotal');
const shippingEl = document.getElementById('shipping');
const totalEl = document.getElementById('total');

const SHIPPING = 30.00; // default flat shipping; change as needed

function parsePrice(value) {
  if (typeof value === 'number') return value;
  if (!value) return 0;
  // remove any non-number characters like $ and commas
  const n = parseFloat(String(value).replace(/[^0-9.-]+/g, ''));
  return isNaN(n) ? 0 : n;
}

function computeTotals(cart) {
  const subtotal = cart.reduce((sum, item) => {
    const price = parsePrice(item.price);
    const qty = parseInt(item.quantity, 10) || 0;
    return sum + price * qty;
  }, 0);

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  shippingEl.textContent = `$${SHIPPING.toFixed(2)}`;
  totalEl.textContent = `$${(subtotal + SHIPPING).toFixed(2)}`;
}

function renderCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartTableBody.innerHTML = ''; // Clear previous

  cart.forEach((item, index) => {
    const price = parsePrice(item.price);
    const qty = parseInt(item.quantity, 10) || 0;
    const rowTotal = price * qty;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a href="#" class="remove-item" data-index="${index}"><i class="fas fa-trash-alt"></i></a></td>
      <td><img src="${item.img || 'img/shoes/1.jpg'}" width="50"></td>
      <td><h5>${item.name || ''}</h5></td>
      <td><h5>$${price.toFixed(2)}</h5></td>
      <td><input class="w-25 pl-1 item-qty" data-index="${index}" value="${qty}" type="number" min="1"></td>
      <td class="row-total"><h5>$${rowTotal.toFixed(2)}</h5></td>
    `;
    cartTableBody.appendChild(row);
  });

  // Add event listeners for delete buttons
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(btn.getAttribute('data-index'), 10);
      removeItem(index);
    });
  });

  // Add event listeners for qty inputs
  const qtyInputs = document.querySelectorAll('.item-qty');
  qtyInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const idx = parseInt(input.getAttribute('data-index'), 10);
      let newQty = parseInt(input.value, 10);
      if (isNaN(newQty) || newQty < 1) newQty = 1;
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart[idx]) {
        cart[idx].quantity = newQty;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); // re-render to update totals and row totals
      }
    });
  });

  computeTotals(cart);
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1); // Remove the item
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); // Re-render
}

renderCart();
