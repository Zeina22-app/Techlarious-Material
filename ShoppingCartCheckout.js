const products = [
    { id: 1, name: "Laptop", price: 1200, stock: 3 },
    { id: 2, name: "Mouse", price: 25, stock: 10 },
    { id: 3, name: "Headset", price: 100, stock: 5 }
];

let cart = [];
//- Add a product to the cart.
//- Prevent adding a product if quantity is greater than stock.
//- If product already exists in cart, increase its quantity.

function addToCart(productId, quantity) {

    const product = products.find(p => p.id === productId);

    if (!product) {
        console.log("Product does not exist");
        return;
    }

    if (quantity <= 0) {
        console.log("Invalid quantity");
        return;
    }

    const cartItem = cart.find(item => item.productId === productId);

    const currentQuantity = cartItem ? cartItem.quantity : 0;

    if (currentQuantity + quantity > product.stock) {
        console.log("Not enough stock available");
        return;
    }

    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity
        });
    }

    console.log("Product added successfully");
}

// Remove a product from the cart
function removeFromCart(productId) {

    const index = cart.findIndex(item => item.productId === productId);

    if (index === -1) {
        console.log("Product not found in cart");
        return;
    }

    cart.splice(index, 1);

    console.log("Product removed successfully");
}

//Calculate subtotal
function calculateSubtotal() {

    return cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

}

// Apply 10% discount if subtotal is above 1000.
function calculateDiscount(subtotal) {

    if (subtotal > 1000) {
        return subtotal * 0.10;
    }

    return 0;
}

//Add 11% tax after discount.
function calculateTax(subtotal, discount) {

    const amountAfterDiscount = subtotal - discount;

    return amountAfterDiscount * 0.11;
}

//Return a checkout summary
function checkoutSummary() {

    const subtotal = calculateSubtotal();

    const discount = calculateDiscount(subtotal);

    const tax = calculateTax(subtotal, discount);

    const total = subtotal - discount + tax;

    return {
        items: cart,
        subtotal: subtotal,
        discount: discount,
        tax: tax,
        total: total
    };
}

addToCart(1, 1);
addToCart(2, 2);

console.log("Cart:", cart);

console.log("Checkout Summary:", checkoutSummary());