document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        
        apiKey: "AIzaSyApECQvbuNdd1FH8S7SEPc6--j06F5jpqQ",
        authDomain: "sahayak-3f529.firebaseapp.com",
        databaseURL: "https://sahayak-3f529-default-rtdb.firebaseio.com",
        projectId: "sahayak-3f529",
        storageBucket: "sahayak-3f529.appspot.com",
        messagingSenderId: "388120961135",
        appId: "1:388120961135:web:964bad44c6c8db765c6d9a",
        measurementId: "G-2G3CM84BWC"
    };

    
    firebase.initializeApp(firebaseConfig);

    var dataRef = firebase.database().ref('databasepage');
    var tableBody = document.getElementById('table-body');

    // Function to display data in the table
    function displayData() {
        tableBody.innerHTML = ''; // Clear existing content

        // Fetch data from Firebase and populate the table
        dataRef.limitToLast(50).once('value', function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                var data = childSnapshot.val();
                var date = data.date;
                var name = data.name;
                var field = data.field;
                var task = data.task;
                var stat = data.stat;
                var finishTime = data.finishTime || ''; // Get finishTime or set it to an empty string if not available

                // Create a table row for each data entry
                var tableRow = document.createElement('tr');

                tableRow.innerHTML = `
                    <td>${date}</td>
                    <td>${name}</td>
                    <td>${field}</td>
                    <td>${task}</td>
                    <td>${stat}</td>
                    <td>${finishTime}</td>
                    <td><input type="checkbox" class="edit-checkbox"></td>
                `;

                // Append the row to the table body
                tableBody.appendChild(tableRow);

                // Add an event listener for the checkbox to toggle status and update finishTime
                tableRow.querySelector('.edit-checkbox').addEventListener('change', function() {
                    // Get the current status
                    var currentStatus = stat;

                    // Toggle the status
                    var newStatus = currentStatus === 'completed' ? 'pending' : 'completed';

                    // Update the finishTime with the current time
                    var currentTime = new Date().toLocaleString();

                    // Update the status and finishTime in the Firebase database
                     childSnapshot.ref.update({ stat: newStatus, finishTime: currentTime })
                        .then(function() {
                            // Update the displayed status and finishTime
                            stat = newStatus;
                            finishTime = currentTime;
                        })
                        .catch(function(error) {
                            console.error("Error updating status and finishTime: " + error);
                        });
                });

                // Add an event listener for the Edit button
                var editButton = document.createElement('button');
                editButton.innerText = 'Edit';
                editButton.addEventListener('click', function() {
                    // Implement your edit functionality here
                    // You can access the data for this row using the 'data' variable
                    // For example, data.date, data.name, etc.
                    alert('Edit clicked for row: ' + date);
                });

                tableRow.querySelector('.edit-checkbox').addEventListener('change', function() {
                    // Enable or disable the Edit button based on checkbox state
                    editButton.disabled = !this.checked;
                });

                tableRow.appendChild(document.createElement('td').appendChild(editButton));
            });
        });
    }

    // Event listeners for the buttons
    document.getElementById('show-data').addEventListener('click', displayData);
    document.getElementById('toggle-status').addEventListener('click', displayData);
    document.getElementById('refresh-table').addEventListener('click', displayData);

    // Initial data display
    displayData();
});
