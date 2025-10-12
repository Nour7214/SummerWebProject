console.log('sproduct.js loaded');

// Load selected product info
const product = JSON.parse(localStorage.getItem('selectedProduct'));
console.log(product);
console.log(product.productImage);


if (product) {
    console.log(document.getElementById('MainImg').src);
    
  document.getElementById('MainImg').src = (product.productImage);
    // console.log(document.getElementById('MainImg').src);

  document.querySelector('.sproduct h3').textContent = (product.productName);
  document.querySelector('.sproduct h2').textContent = (product.productPrice);
}

// Small images switching
const MainImg = document.getElementById('MainImg');
const smallImgs = document.getElementsByClassName('small-img');

Array.from(smallImgs).forEach(img => {
  img.addEventListener('click', () => {
    MainImg.src = img.src;
  });
});

//######################################################################
//######################################################################


const button = document.querySelector('.buy-btn');

  button.addEventListener('click', (e) => {
    e.stopPropagation(); // So parent product click doesn’t fire too

    // Get product data
    const product = button.closest('.product');
    const productName = product.querySelector('.p-name')?.textContent || 'Unknown';
    const productPrice = product.querySelector('.p-price')?.textContent || '$0';
    const productImg = product.querySelector('img')?.src || '';
    const productQuantity = product.querySelector('#quantity').value;
    // console.log(productQuantity);
    

    // Create a cart item
    const cartItem = {
      name: productName,
      price: productPrice,
      img: productImg,
      quantity: productQuantity
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
    saveCartToFirebase(cart);

    console.log(`Added to cart: ${productName}`);
    alert(`${productName} added to cart!`);
  });

  function saveCartToFirebase(cart) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return; // only save if logged in
  const userId = user.uid;

  const db = firebase.database();
  db.ref('carts/' + userId).set(cart)
    .then(() => console.log('Cart saved to Firebase'))
    .catch(err => console.error('Error saving cart:', err));
}

