function generateCookieId() {
    return Math.random().toString(36).substring(2, 9);
}

function checkCookie() {
    let cookie = document.cookie;
    if (!cookie.includes("user_id")) {
        let userId = generateCookieId();
        let expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30); // Cookie will expire in 30 days
        document.cookie = `user_id=${userId}; Secure; SameSite=None; expires=${expirationDate.toUTCString()}`;
        console.log("Cookie created successfully");
    } else {
        console.log("User already has a cookie");
    }

   
}

window.onload = checkCookie;