// Initialize an empty array to store customer data (assuming this data is already available at runtime)
let customers = [];  // This array should already be populated with customers' data (from check-in)

// Handle check-out form submission
document.getElementById('checkOutForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const roomNumberCheckOut = document.getElementById('roomNumberCheckOut').value;
    const checkInDateCheckOut = document.getElementById('checkInDateCheckOut').value;
    const checkOutDate = document.getElementById('checkOutDate').value;
    const amountPaid = parseFloat(document.getElementById('amountPaid').value);
    const payBalance = parseFloat(document.getElementById('payBalance').value);

    // Check if the form fields are filled correctly
    if (!roomNumberCheckOut || !checkOutDate || isNaN(amountPaid) || isNaN(payBalance)) {
        alert("Please fill in all the fields with valid information.");
        return;
    }

    // Find the customer by room number
    const customer = customers.find(c => c.roomNumber === roomNumberCheckOut);

    if (customer) {
        // Calculate the total amount and remaining balance
        const checkInDate = new Date(customer.checkInDateTime);
        const checkOutDateObj = new Date(checkOutDate);
        const daysStayed = Math.ceil((checkOutDateObj - checkInDate) / (1000 * 3600 * 24)); // Calculate the number of days stayed

        const remainingBalance = customer.totalAmount - customer.amountPaid;

        // Populate payment fields
        document.getElementById('checkInDateCheckOut').value = formatDate(customer.checkInDateTime);  // Display check-in date
        document.getElementById('totalAmount').value = formatCurrency(customer.totalAmount);  // Display total amount
        document.getElementById('remainingBalance').value = formatCurrency(remainingBalance);  // Display remaining balance

        // Validate the payment amount
        if (payBalance <= 0) {
            alert("Please enter a valid positive payment amount.");
            return;
        }

        const totalAmountToPay = remainingBalance - payBalance;
        if (totalAmountToPay >= 0) {
            // Update the customer's data with the new payment information
            customer.amountPaid += payBalance;

            // Optionally, store this information in your backend or database
            console.log(`Check-out details for Room ${roomNumberCheckOut}:`);
            console.log(`Total Amount: ₹${customer.totalAmount}`);
            console.log(`Amount Paid: ₹${customer.amountPaid}`);
            console.log(`Remaining Balance: ₹${totalAmountToPay}`);

            alert(`Remaining balance of ₹${payBalance} paid successfully! Check-Out complete.`);

            // Reset the form for next check-out
            document.getElementById('checkOutForm').reset();
        } else {
            alert("The payment amount exceeds the remaining balance. Please check the payment amount.");
        }
    } else {
        alert("Room number not found. Please check the room number and try again.");
    }
});

// Currency formatting function
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

// Date formatting function (optional, if you want to format check-in date in a more readable format)
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN'); // Formats date in 'dd/mm/yyyy' format
}
