document.getElementById("order-status-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

  
    const orderId = document.getElementById("order-id").value.trim();
    if (orderId) {
        
        fetchOrderStatus(orderId);
    } else {
        alert("Please enter a valid Order ID.");
    }
});

function fetchOrderStatus(orderId) {
    const apiUrl = `https://udfb8ol471.execute-api.us-east-1.amazonaws.com/devel/?orderId=${encodeURIComponent(orderId)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Response from Lambda:", data); 
            const orderStatus = data.status;
            const orderDate = data.date;
            document.getElementById("order-status").textContent = `Order Status: ${orderStatus}`;
            document.getElementById("order-date").textContent = `Order Date: ${orderDate}`;
        })
        .catch(error => {
            console.error("Error fetching order status:", error);
            document.getElementById("order-status").textContent = "Error fetching order status. Please try again later.";
        });
}
