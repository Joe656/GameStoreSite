document.addEventListener("DOMContentLoaded", function () {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const cartItemsContainer = document.getElementById("cart-items");
    const totalCostElement = document.getElementById("total-cost");
    let totalCost = 0;
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
       
        cartItems.forEach(item => {
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");
            cartItemElement.innerHTML = `
                <p>Game: ${item.name}</p>
                <p>Price: $${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <button class="delete-btn">Remove Item</button>
            `;
            cartItemsContainer.appendChild(cartItemElement);
            totalCost += parseFloat(item.price*item.quantity);
        });
        if (totalCostElement) {
            totalCostElement.textContent = `Total: $${totalCost.toFixed(2)}`;
        } else {
            console.error('Total cost element not found');      
        }
        
    }
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const itemIndex = Array.from(button.parentElement.parentElement.children).indexOf(button.parentElement);
            
            cartItems.splice(itemIndex, 1);
            
            localStorage.setItem("cart", JSON.stringify(cartItems));
            
            button.parentElement.remove();
            
            totalCost -= parseFloat(cartItems[itemIndex].price * cartItems[itemIndex].quantity);
            totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
        });
    });
    const checkoutButton = document.getElementById("checkout-btn");

    checkoutButton.addEventListener("click", () => {
       
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    
   
        insertCartItemsIntoDatabase(cartItems, response => {
          
            const rep = JSON.parse(response.body);
            console.log("Response:", rep);
            const orderId = rep.orderId; 
    
           
            const confirmationUrl = `order.html?orderId=${orderId}`;
            console.log("Redirecting to:", confirmationUrl); 
            window.location.href = confirmationUrl;
    
            
            localStorage.removeItem("cart");
        });
    });
    
    
    function insertCartItemsIntoDatabase(cartItems, callback) {
        const cookies = document.cookie; 
        
        
        fetch('https://8qsoyautm7.execute-api.us-east-1.amazonaws.com/dev', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies 
            },
            body: JSON.stringify(cartItems)
        })
        .then(response => response.json())
        .then(data => {
           
            console.log("Response data:", data);
            
           
            callback(data);
        })
        .catch(error => {
            console.error("Error inserting cart items:", error);
        });
    }
});
