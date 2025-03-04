    // Define API keys and other sensitive details in separate variables
const API_KEY = 'DSW0zVqt5HL46PHddqxmOndBpWVrQPvDPJ4uCa4armbj1fSjAFAmssCRsTPjkDX9';
const API_SECRET = 'keJ5T8bWp62o22ntNpR2ND386hQqhT1GVLDw0EZLqe9ZasdbIJppx8MS4Usst85T';
const BINANCE_USDT_ADDRESS = 'TCzSfcTu5Ch8ZxNeNXoL1ZanKPkCARz441'; // Example address

document.getElementById('payButton').addEventListener('click', function() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && expiryDate && cvv) {
        // Proceed with payment API integration here

        // Example of sending payment data to an API
        makePayment(cardNumber, expiryDate, cvv);
    } else {
        alert("Please fill in all the fields.");
    }
});

function makePayment(cardNumber, expiryDate, cvv) {
    // Example: Make an API call to process the payment
    // You need to replace this with an actual payment API service

    fetch('https://payment-api.com/charge', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv,
            apiSecret: API_SECRET,
            amount: 50, // Example amount
            usdtAddress: BINANCE_USDT_ADDRESS
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Payment Successful!");

            // Send order details to Telegram Bot
            sendToTelegram(data.orderDetails);
        } else {
            alert("Payment failed. Please try again.");
        }
    })
    .catch(error => {
        console.error("Payment error:", error);
        alert("There was an error processing your payment.");
    });
}

function sendToTelegram(orderDetails) {
    const TELEGRAM_BOT_TOKEN = "7590766158:AAFTMfMpGQkg_4iw3UyOiGX4NdarPIvcwRE";
    const TELEGRAM_CHAT_ID = "6807445600";
    
    const message = `
        New Order Received:
        Product: ${orderDetails.productName}
        Price: ${orderDetails.price}
        Email: ${orderDetails.email}
    `;

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        })
    })
    .then(response => response.json())
    .then(data => console.log("Telegram message sent:", data))
    .catch(error => console.error("Error sending Telegram message:", error));
}