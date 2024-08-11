src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"
src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js"
document.addEventListener("DOMContentLoaded", function() {
    // Elements for Cart Panel
    var cartIcon = document.querySelector('.cart-icon');
    var cartPanel = document.getElementById('cart-panel');
    var closeCartBtn = document.getElementById('close-cart');
    var deleteBtn = document.getElementById('delete-btn');
    var increaseQtyBtn = document.getElementById('increase-qty');
    var decreaseQtyBtn = document.getElementById('decrease-qty');
    var quantityNumber = document.getElementById('quantity-number');
    var productPrice = document.getElementById('product-price');
    var productName = document.getElementById('product-name');
    var productImage = document.getElementById('product-image');
    var totalAmount = document.getElementById('total-amount');
    var currentQuantity = parseInt(quantityNumber.textContent, 10);
    var unitPrice = parseFloat(productPrice.textContent.replace('$', ''));

    function updateTotalAmount() {
        var total = currentQuantity * unitPrice;
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    function openCartPanel() {
        cartPanel.style.display = 'block';
    }

    function closeCartPanel() {
        cartPanel.style.display = 'none';
    }

    cartIcon.addEventListener('click', openCartPanel);

    closeCartBtn.addEventListener('click', closeCartPanel);

    deleteBtn.addEventListener('click', function() {
        closeCartPanel();
        alert('Item removed from the cart');
        // Add logic to remove the item from the cart
    });

    document.getElementById('checkout-btn').addEventListener('click', function() {
        window.location.href = 'checkout.html'; // Redirect to checkout page
    });

    increaseQtyBtn.addEventListener('click', function() {
        currentQuantity++;
        quantityNumber.textContent = currentQuantity;
        updateTotalAmount();
    });

    decreaseQtyBtn.addEventListener('click', function() {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityNumber.textContent = currentQuantity;
            updateTotalAmount();
        }
    });

    // Handle "Add to Cart" button clicks
    var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            var itemName = this.getAttribute('data-name');
            var itemPrice = parseFloat(this.getAttribute('data-price'));
            var itemImage = this.getAttribute('data-image');

            // Update cart panel with the selected product details
            productName.textContent = itemName;
            productPrice.textContent = `$${itemPrice.toFixed(2)}`;
            productImage.src = itemImage;

            // Set unit price for calculations
            unitPrice = itemPrice;
            currentQuantity = 1; // Reset quantity to 1 when a new item is added
            quantityNumber.textContent = currentQuantity;
            updateTotalAmount();

            // Open the cart panel
            openCartPanel();
        });
    });

    // Initialize total amount display
    updateTotalAmount();
});
// Function to add a product to the cart
function addToCart(productName, productPrice, productImage) {
    // Create a product object
    const product = {
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };

    // Get the current cart from localStorage or create an empty array if no cart exists
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex !== -1) {
        // If the product exists, increase the quantity
        cart[existingProductIndex].quantity += 1;
    } else {
        // If the product does not exist, add it to the cart
        cart.push(product);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Alert the user that the product has been added to the cart
    alert(`${productName} has been added to your cart!`);
}
