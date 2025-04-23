// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    const firebaseConfig = {
        // Your Firebase config here
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
    var databasepage = firebase.database().ref("databasepage");

    // Function to fetch and display current data
    function displayData() {
        var displayElement = document.getElementById('dispdata');

        // Reference to the database location where data is stored
        var dataRef = firebase.database().ref('databasepage');

        dataRef.limitToLast(1).on('child_added', function(childSnapshot) {
            displayElement.innerHTML = ''; // Clear existing content

            var data = childSnapshot.val();
            var date = data.date;
            var name = data.name;
            var field = data.field;
            var task = data.task;
            var stat = data.stat;

            // Create a table element
            var table = document.createElement('table');
            table.classList.add('data-table'); // Add a class for styling

            // Create table header
            var tableHeader = document.createElement('thead');
            tableHeader.innerHTML = `
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Field</th>
                    <th>Task</th>
                    <th>Status</th>
                </tr>
            `;
            table.appendChild(tableHeader);

            // Create table body
            var tableBody = document.createElement('tbody');

            // Create a table row for the current data entry
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

            // Append the table body to the table
            table.appendChild(tableBody);

            // Append the table to the display element
            displayElement.appendChild(table);
        });
    }

    // Call the displayData function to initially display the current data
    displayData();

    document.getElementById('databasepage').addEventListener("submit", submitform);

    function submitform(e) {
        e.preventDefault(); // Prevent form submission

        // Get values from form elements
        var date = document.getElementById("date").value;
        var name = document.getElementById("name").value;
        var field = document.getElementById("field").value;
        var task = document.getElementById("task").value;
        var stat = document.getElementById("stat").value;

        // Save data to Firebase
        savemsg(date, name, field, task, stat);

        // Display a success message
        document.querySelector(".alert").style.display = "block";

        // Remove the success message after 3 seconds
        setTimeout(() => {
            document.querySelector(".alert").style.display = "none";
        }, 3000);

        // Reset the form
        document.getElementById("databasepage").reset();
    }

    // Function to save data to Firebase
    function savemsg(date, name, field, task, stat) {
        var newContactForm = databasepage.push();
        newContactForm.set({
            date: date,
            name: name,
            field: field,
            task: task,
            stat: stat,
        }, (error) => {
            if (error) {
                console.error("Error saving data:", error);
            } else {
                console.log("Data saved successfully");
            }
        });
    }
});
