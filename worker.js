document.addEventListener('DOMContentLoaded', function() {
    // Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyApECQvbuNdd1FH8S7SEPc6--j06F5jpqQ",
        authDomain: "sahayak-3f529.firebaseapp.com",
        databaseURL: "https://sahayak-3f529-default-rtdb.firebaseio.com",
        projectId: "sahayak-3f529",
        storageBucket: "sahayak-3f529.appspot.com",
        messagingSenderId: "388120961135",
        appId: "1:388120961135:web:964bad44c6c8db765c6d9a",
        measurementId: "G-2G3CM84BWC"
    };

    // Initialize Firebase
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

                // Create a table row for each data entry
                var tableRow = document.createElement('tr');

                tableRow.innerHTML = `
                    <td>${date}</td>
                    <td>${name}</td>
                    <td>${field}</td>
                    <td>${task}</td>
                    <td>${stat}</td>
                `;

                // Append the row to the table body
                tableBody.appendChild(tableRow);
            });
        });
    }

    // Event listeners for the buttons
    document.getElementById('show-data').addEventListener('click', displayData);
    document.getElementById('refresh-table').addEventListener('click', displayData);

    // Initial data display
    displayData();
});