const cartTableBody = document.querySelector('#cart-container tbody');

function renderCart() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartTableBody.innerHTML = ''; // Clear previous

  cart.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><a href="#" class="remove-item" data-index="${index}"><i class="fas fa-trash-alt"></i></a></td>
      <td><img src="${item.img}" width="50"></td>
      <td><h5>${item.name}</h5></td>
      <td><h5>${item.price}</h5></td>
      <td><input class="w-25 pl-1 item-qty" value="${item.quantity}" type="number" min="1"></td>
      <td><h5>${parseFloat(item.price.replace('$',''))*parseInt(item.quantity)}</h5></td>
    `;
    cartTableBody.appendChild(row);
  });

  // Add event listeners for delete buttons
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const index = btn.getAttribute('data-index');
      removeItem(index);
    });
  });
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1); // Remove the item
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart(); // Re-render
}

renderCart();
