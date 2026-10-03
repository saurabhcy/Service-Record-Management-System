const table = document.getElementById("employeeTable");

const searchType = document.getElementById("searchType");

const searchValue = document.getElementById("searchValue");

const searchBtn = document.getElementById("searchBtn");


// Load All Employees

async function loadEmployees() {

    const response = await fetch("http://localhost:5000/employee");

    const data = await response.json();

    displayEmployees(data.employees);

}


// Search Employees

async function searchEmployees() {

    const type = searchType.value;

    const value = searchValue.value.trim();

    if (value === "") {

        loadEmployees();

        return;

    }

    const response = await fetch(

        `http://localhost:5000/employee/search?type=${type}&value=${value}`

    );

    const data = await response.json();

    displayEmployees(data.employees);

}


// Display Employees

function displayEmployees(employees) {

    table.innerHTML = "";

    if (employees.length === 0) {

        table.innerHTML = `

        <tr>

            <td colspan="6" style="text-align:center">

                No Employee Found

            </td>

        </tr>

        `;

        return;

    }

    employees.forEach(employee => {

        table.innerHTML += `

        <tr>

            <td>${employee.employeeId}</td>

            <td>${employee.employeeName}</td>

            <td>${employee.designation}</td>

            <td>${employee.billUnit}</td>

            <td>${employee.status}</td>

           <td>

<button onclick="viewEmployee('${employee.employeeId}')">

View

</button>

</td>

        </tr>

        `;

    });

}


searchBtn.addEventListener("click", searchEmployees);

loadEmployees();

function viewEmployee(employeeId) {

    window.location.href =
    `/pages/employee-details.html?employeeId=${employeeId}`;

}