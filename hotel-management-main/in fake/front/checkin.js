document.addEventListener('DOMContentLoaded', () => {
    const getRoomRentBtn = document.getElementById('getRoomRentBtn');
    const roomNumberInput = document.getElementById('roomNumberCheckIn');
    const totalPaymentAmountInput = document.getElementById('totalPaymentAmount');
    const checkInForm = document.getElementById('checkInForm');
    
    // Event listener for getting the room rent based on room number
    getRoomRentBtn.addEventListener('click', async () => {
        const roomNumber = roomNumberInput.value.trim(); // Make sure to trim the room number input

        if (!roomNumber) {
            alert('Please enter a room number.');
            return;
        }

        try {
            // Fetch room rent from the server
            const response = await fetch(`http://localhost:3000/api/getRoomRent/${roomNumber}`);
            const data = await response.json();
            
            // Check if the room rent is found
            if (response.ok && data && data.rent) {
                // Set the rent in the payment field if room is found
                totalPaymentAmountInput.value = data.rent;
                alert(`Room rent for room number ${roomNumber} is ₹${data.rent}`); // Display rent in an alert
            } else {
                alert('Room not found. Please enter a valid room number.'); // Show alert if room not found
            }
        } catch (error) {
            console.error('Error fetching room rent:', error);
            alert('There was an error fetching the room rent. Please try again.'); // Show alert for errors
        }
    });

    // Handle form submission for check-in
    checkInForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const guestName = document.getElementById('guestName').value;
        const roomNumber = roomNumberInput.value.trim();
        const checkInDate = document.getElementById('checkInDate').value;
        const checkOutDate = document.getElementById('checkOutDate').value;
        const totalPayment = totalPaymentAmountInput.value;
        const paymentAmount = document.getElementById('paymentAmount').value;
        const paymentStatus = document.getElementById('paymentStatus').value;

        // Validate form fields
        if (!guestName || !roomNumber || !checkInDate || !checkOutDate || !totalPayment || !paymentAmount || !paymentStatus) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            // Send check-in data to the backend
            const response = await fetch('http://localhost:3000/check-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    guestName,
                    roomNumber,
                    checkInDate,
                    checkOutDate,
                    totalPayment,
                    paymentAmount,
                    paymentStatus,
                }),
            });

            if (!response.ok) {
                throw new Error('Error during check-in.');
            }

            // Assuming result contains a success message
            alert('Check-in successful!');
            checkInForm.reset(); // Reset form after successful submission
        } catch (error) {
            console.error('Error during check-in:', error);
            alert('Something went wrong. Please try again.');
        }
    });
});
