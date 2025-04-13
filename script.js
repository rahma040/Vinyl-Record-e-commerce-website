let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartIcon();
}

function updateCartIcon() {
    const cartIcons = document.querySelectorAll('#cart-icon');
    cartIcons.forEach(icon => {
        icon.textContent = `🛒 Cart (${cart.length})`;
    });
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        let total = 0;
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button class="remove-item" data-name="${item.name}">Remove</button>
            </div>
        `).join('');
        
        total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemName = this.getAttribute('data-name');
                cart = cart.filter(item => item.name !== itemName);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
                updateCartIcon();
            });
        });
    }
}

// Update cart icon on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartIcon();
    displayCartItems();
    
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username.trim() === '' || password.trim() === '') {
                return;
            }
            window.location.href = 'index.html';
        });
    }
});



