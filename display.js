
function fetchProducts() {
    fetch('https://8qsoyautm7.execute-api.us-east-1.amazonaws.com/dev')
        .then(response => response.json())
        .then(products => {
            displayProducts(products); // Call function to display products
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
}


function displayProducts(products) {
    const productContainer = document.getElementById('product-container');


    products.body.forEach(productData => {
        const [game_id, img, game, platform, price] = productData;

        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${img}" alt="${game} Image">
            <h2>${game}</h2>
            <p>$${price}</p>
            <p>${platform}</p>
            <button class="cart" data-id="${game_id}" data-name="${game}" data-price="${price}">Add to Cart</button>
        `;

        productContainer.appendChild(card);

      
        });
        const addToCartButtons = document.querySelectorAll('.cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
    });

}



function addToCart(event) {
            const productId = event.target.dataset.id;
            const productName = event.target.dataset.name;
            const productPrice = event.target.dataset.price;

            
            let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

            
            const existingItemIndex = cartItems.findIndex(item => item.id === productId);
            if (existingItemIndex !== -1) {
                
                cartItems[existingItemIndex].quantity++;
            } else {
                
                cartItems.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
            }

            
            localStorage.setItem('cart', JSON.stringify(cartItems));

            
            console.log('Product added to cart successfully');
        }


fetchProducts();
