document.addEventListener('DOMContentLoaded', function() {
    // Function to handle saving a new room
    const saveRoom = async (e) => {
        e.preventDefault();
        
        const roomData = {
            roomNumber: document.getElementById("roomNumber").value,
            roomType: document.getElementById("roomType").value,
            comfort: document.getElementById("comfort").value,
            size: document.getElementById("size").value,
            rent: parseInt(document.getElementById("rent").value),
            status: "available", // Assuming the room is available initially
        };

        // Validate the form fields
        if (!roomData.roomNumber || !roomData.roomType || isNaN(roomData.rent)) {
            alert('Please fill in all fields correctly');
            return;
        }

        try {
            // Disable the submit button to prevent resubmission
            const submitButton = document.querySelector('#add-room-form button[type="submit"]');
            submitButton.disabled = true;
            
            console.log('Sending room data:', roomData);  // Debugging step

            // Send the room data to the backend (replace with your API endpoint)
            const response = await fetch('http://localhost:3000/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(roomData),
            });

            console.log('Response Status:', response.status);  // Debugging response status

            if (response.ok) {
                alert("Room added successfully!");
                document.querySelector('#add-room-form').reset(); // Reset the form after successful submission
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
                alert(`Error adding room: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding room');
        } finally {
            // Re-enable the submit button after the request completes
            document.querySelector('#add-room-form button[type="submit"]').disabled = false;
        }
    };

    // Function to handle deleting a room
    const deleteRoom = async (e) => {
        e.preventDefault();

        const roomNumberToDelete = document.getElementById("deleteRoomNumber").value;

        if (!roomNumberToDelete) {
            alert('Please enter a room number to delete');
            return;
        }

        try {
            // Disable the submit button to prevent resubmission
            const submitButton = document.querySelector('#delete-room-form button[type="submit"]');
            submitButton.disabled = true;

            // Send the request to delete the room (replace with your API endpoint)
            const response = await fetch(`http://localhost:3000/api/rooms/${roomNumberToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Room deleted successfully!");
                document.querySelector('#delete-room-form').reset(); // Reset the form after successful deletion
            } else {
                const errorData = await response.json().catch(() => ({ message: 'Room not found' }));
                alert(`Error deleting room: ${errorData.message || 'Room not found'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting room');
        } finally {
            // Re-enable the submit button after the request completes
            document.querySelector('#delete-room-form button[type="submit"]').disabled = false;
        }
    };

    // Add event listener for saving a room
    document.querySelector('#add-room-form').addEventListener('submit', saveRoom);

    // Add event listener for deleting a room
    document.querySelector('#delete-room-form').addEventListener('submit', deleteRoom);
});
