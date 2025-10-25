// Initialize an empty array to store customer data
// let customers = [];

// Handle adding a customer
// document.getElementById('addCustomerForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent default form submission

//     // Get form values
//     const guestName = document.getElementById('guestName').value;
//     const roomNumber = document.getElementById('roomNumber').value;
//     const mobileNumber = document.getElementById('mobileNumber').value;
//     const checkInDateTime = document.getElementById('checkInDateTime').value;
//     const totalAmount = document.getElementById('totalAmount').value;
//     const amountPaid = document.getElementById('amountPaid').value;

//     // Create a customer object and push it into the customers array
//     const newCustomer = {
//         guestName,
//         roomNumber,
//         mobileNumber,
//         checkInDateTime,
//         totalAmount: parseFloat(totalAmount),
//         amountPaid: parseFloat(amountPaid)
//     };

//     customers.push(newCustomer);

//     // Reset the form
//     document.getElementById('addCustomerForm').reset();

//     // Optionally, alert that the customer was added
//     alert("Customer added successfully!");
// });

// Function to search for a customer by room number or guest name
function searchCustomer() {
    // Get the search query
    const searchQuery = document.getElementById('searchRoomOrName').value.trim().toLowerCase();

    // Find the customer by room number or guest name
    const customer = customers.find(c => c.roomNumber.toLowerCase() === searchQuery || c.guestName.toLowerCase() === searchQuery);

    // Get DOM elements for displaying customer details
    const customerDetails = document.getElementById('customerDetails');
    const errorMessage = document.getElementById('errorMessage');

    if (customer) {
        // Populate customer details
        document.getElementById('guestNameDetails').textContent = customer.guestName;
        document.getElementById('roomNumberDetails').textContent = customer.roomNumber;
        document.getElementById('mobileNumberDetails').textContent = customer.mobileNumber;
        document.getElementById('checkInDateTimeDetails').textContent = customer.checkInDateTime;
        document.getElementById('totalAmountDetails').textContent = customer.totalAmount;
        document.getElementById('amountPaidDetails').textContent = customer.amountPaid;
        document.getElementById('remainingBalanceDetails').textContent = (customer.totalAmount - customer.amountPaid);

        // Show the customer details and hide the error message
        customerDetails.style.display = 'block';
        errorMessage.style.display = 'none';
    } else {
        // Show error message if customer is not found
        customerDetails.style.display = 'none';
        errorMessage.style.display = 'block';
    }
}
