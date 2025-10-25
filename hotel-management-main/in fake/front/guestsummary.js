// Array to store guest data
let guests = [];

// Handle check-in form submission
document.getElementById('checkInForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const guestName = document.getElementById('guestName').value;
    const roomNumber = document.getElementById('roomNumberCheckIn').value;
    const checkInDate = document.getElementById('checkInDate').value;
    const checkOutDate = document.getElementById('checkOutDate').value;
    const paymentAmount = document.getElementById('paymentAmount').value;
    const paymentStatus = document.getElementById('paymentStatus').value;
    const roomRent = document.getElementById('roomRent').value; // Get room rent entered by user

    // Validate if roomRent is provided and is a valid number
    if (!roomRent || roomRent <= 0) {
        alert("Please enter a valid room rent.");
        return;
    }

    // Convert roomRent to a number
    const rent = parseFloat(roomRent);

    // Calculate the total payment (based on room rent and number of days stayed)
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const daysStayed = (checkOut - checkIn) / (1000 * 3600 * 24);
    const totalPayment = daysStayed * rent;

    // Store guest details in the guests array
    guests.push({
        guestName,
        roomNumber,
        mobileNumber: "", // Add logic for mobile if needed
        checkInDateTime: `${checkInDate} ${checkIn.getHours()}:${checkIn.getMinutes()}`,
        totalAmount: totalPayment,
        amountPaid: paymentAmount,
        remainingBalance: totalPayment - paymentAmount,
    });

    // Display guest summary table
    displayGuestSummary();
    alert("Check-In Successful!");
    document.getElementById('checkInForm').reset();
});

// Function to display the guest summary table
function displayGuestSummary() {
    const tableBody = document.getElementById('guestTableBody');
    tableBody.innerHTML = ""; // Clear existing rows

    guests.forEach(guest => {
        const row = document.createElement("tr");

        const guestNameCell = document.createElement("td");
        guestNameCell.textContent = guest.guestName;

        const roomNumberCell = document.createElement("td");
        roomNumberCell.textContent = guest.roomNumber;

        const mobileNumberCell = document.createElement("td");
        mobileNumberCell.textContent = guest.mobileNumber || "Not provided";

        const checkInDateTimeCell = document.createElement("td");
        checkInDateTimeCell.textContent = guest.checkInDateTime;

        const totalAmountCell = document.createElement("td");
        totalAmountCell.textContent = `₹${guest.totalAmount}`;

        const amountPaidCell = document.createElement("td");
        amountPaidCell.textContent = `₹${guest.amountPaid}`;

        const remainingBalanceCell = document.createElement("td");
        remainingBalanceCell.textContent = `₹${guest.remainingBalance}`;

        row.appendChild(guestNameCell);
        row.appendChild(roomNumberCell);
        row.appendChild(mobileNumberCell);
        row.appendChild(checkInDateTimeCell);
        row.appendChild(totalAmountCell);
        row.appendChild(amountPaidCell);
        row.appendChild(remainingBalanceCell);

        tableBody.appendChild(row);
    });
}

// Function to search for guests by name or room number
function searchGuest() {
    const searchQuery = document.getElementById('searchGuest').value.toLowerCase();
    const filteredGuests = guests.filter(guest => 
        guest.guestName.toLowerCase().includes(searchQuery) || guest.roomNumber.includes(searchQuery)
    );

    // Update the guest summary table based on the search query
    const tableBody = document.getElementById('guestTableBody');
    tableBody.innerHTML = ""; // Clear existing rows

    filteredGuests.forEach(guest => {
        const row = document.createElement("tr");

        const guestNameCell = document.createElement("td");
        guestNameCell.textContent = guest.guestName;

        const roomNumberCell = document.createElement("td");
        roomNumberCell.textContent = guest.roomNumber;

        const mobileNumberCell = document.createElement("td");
        mobileNumberCell.textContent = guest.mobileNumber || "Not provided";

        const checkInDateTimeCell = document.createElement("td");
        checkInDateTimeCell.textContent = guest.checkInDateTime;

        const totalAmountCell = document.createElement("td");
        totalAmountCell.textContent = `₹${guest.totalAmount}`;

        const amountPaidCell = document.createElement("td");
        amountPaidCell.textContent = `₹${guest.amountPaid}`;

        const remainingBalanceCell = document.createElement("td");
        remainingBalanceCell.textContent = `₹${guest.remainingBalance}`;

        row.appendChild(guestNameCell);
        row.appendChild(roomNumberCell);
        row.appendChild(mobileNumberCell);
        row.appendChild(checkInDateTimeCell);
        row.appendChild(totalAmountCell);
        row.appendChild(amountPaidCell);
        row.appendChild(remainingBalanceCell);

        tableBody.appendChild(row);
    });
}
