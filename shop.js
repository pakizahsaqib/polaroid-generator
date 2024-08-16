// Existing functionality for scrolling the gallery
let scrollContainer = document.querySelector(".gallery");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
    scrollContainer.style.scrollBehavior = "auto";
});

nextBtn.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += 300;
});

backBtn.addEventListener("click", () => {
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft -= 300;
});

// New functionality for adding products to the cart
let cartTab = document.querySelector('.cartTab');
let cartIcon = document.querySelector('.cart-icon');
let closeCart = document.querySelector('.close');
let listProductHTML = document.querySelector('.listCart');
let cartCount = document.querySelector('.cart-icon span');

let cart = []; // Array to store cart items

// Open and close cart tab
cartIcon.addEventListener('click', () => {
    cartTab.style.display = 'block';
});
closeCart.addEventListener('click', () => {
    cartTab.style.display = 'none';
});

// Add products to the cart
let addToCartButtons = document.querySelectorAll('.gallery button');

addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        let productDiv = button.parentElement;
        let productName = productDiv.querySelector('h3').textContent;
        let productPrice = parseInt(productDiv.querySelector('p').textContent.replace('Rs. ', ''));
        let productImg = productDiv.querySelector('img').src;

        // Check if product already in cart
        let existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name: productName, price: productPrice, img: productImg, quantity: 1 });
        }

        updateCart();
    });
});

// Update cart display and total price
const updateCart = () => {
    listProductHTML.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(product => {
        totalPrice += product.price * product.quantity;

        let newProductDiv = document.createElement('div');
        newProductDiv.classList.add('items');
        newProductDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h2>${product.name}</h2>
            <div class="price">Rs. ${product.price}</div>
            <div class="quantity">
                <span style="background-color: #ececec" class="minus">&lt;</span>
                <span>${product.quantity}</span>
                <span style="background-color: #ececec" class="plus">&gt;</span>
            </div>
        `;

        // Event listeners for quantity buttons
        newProductDiv.querySelector('.minus').addEventListener('click', () => {
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                cart = cart.filter(item => item.name !== product.name);
            }
            updateCart();
        });

        newProductDiv.querySelector('.plus').addEventListener('click', () => {
            product.quantity++;
            updateCart();
        });

        listProductHTML.appendChild(newProductDiv);
    });

    // Update cart count and total price
    cartCount.textContent = cart.length;
    let totalPriceElement = document.createElement('div');
    totalPriceElement.classList.add('totalPrice');
    totalPriceElement.innerHTML = `Total Price: Rs. ${totalPrice}`;
    listProductHTML.appendChild(totalPriceElement);
};

// Empty the cart on checkout (for demonstration purposes)
document.querySelector('.checkout').addEventListener('click', () => {
    alert('Proceeding to checkout...');
    cart = [];
    updateCart();
});
