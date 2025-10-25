document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and display available rooms
    const fetchAvailableRooms = async () => {
        try {
            // Fetch available rooms from the backend (replace with your API endpoint)
            const response = await fetch('http://localhost:3000/api/rooms?status=available');
            
            if (!response.ok) {
                throw new Error('Error fetching rooms');
            }

            const rooms = await response.json();
            const tableBody = document.getElementById('roomTableBody');

            // Clear the table body before inserting new data
            tableBody.innerHTML = '';

            // Check if rooms are available
            if (rooms.length === 0) {
                tableBody.innerHTML = '<tr><td colspan="5">No available rooms</td></tr>';
                return;
            }

            // Loop through the rooms and insert them into the table
            rooms.forEach(room => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${room.roomNumber}</td>
                    <td>${room.roomType}</td>
                    <td>${room.comfort}</td>
                    <td>${room.size}</td>
                    <td>₹${room.rent}</td>
                `;
                
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error);
            const tableBody = document.getElementById('roomTableBody');
            tableBody.innerHTML = '<tr><td colspan="5">Error fetching rooms. Please try again later.</td></tr>';
        }
    };

    // Fetch available rooms when the page loads
    fetchAvailableRooms();

    // Optionally, refresh the room list periodically (e.g., every 5 seconds)
    setInterval(fetchAvailableRooms, 3000);  // Refresh every 5 seconds
});
