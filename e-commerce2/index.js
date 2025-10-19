// index.js
console.log('index.js loaded');



// Example: Log featured product clicks (customize as needed)
const featuredProducts = document.querySelectorAll('.product');

featuredProducts.forEach(product => {
  product.addEventListener('click', () => {
    const productImage = product.querySelector('img')?.src || '';
    const productName = product.querySelector('.p-name')?.textContent || '';
    const productPrice = product.querySelector('.p-price')?.textContent || '';

    const selectedProduct = {
        'productImage':productImage,
        'productName':productName,
        'productPrice':productPrice
    }
    console.log(selectedProduct);
    
    // Store in localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    
    // localStorage.setItem('productName', productName);
    // localStorage.setItem('productPrice', productPrice);
     

    // ✅ Redirect to sproduct.html
    window.location.href = 'sproduct.html';
  });
});

const buyButtons = document.querySelectorAll('.buy-btn');

buyButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.stopPropagation(); // So parent product click doesn’t fire too

    // Get product data
    const product = button.closest('.product');
    const productName = product.querySelector('.p-name')?.textContent || 'Unknown';
    const productPrice = product.querySelector('.p-price')?.textContent || '$0';
    const productImg = product.querySelector('img')?.src || '';

    // Create a cart item
    const cartItem = {
      name: productName,
      price: productPrice,
      img: productImg,
      quantity: 1
    };

    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already in cart
    const existingItem = cart.find(item => item.name === cartItem.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(cartItem);
    }

    // Save updated cart
    localStorage.setItem('cart', JSON.stringify(cart));
    

    console.log(`Added to cart: ${productName}`);
    alert(`${productName} added to cart!`);
  });
});



