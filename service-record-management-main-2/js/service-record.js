const searchBtn = document.getElementById("searchBtn");
const searchType = document.getElementById("searchType");
const searchValue = document.getElementById("searchValue");

async function searchEmployee() {

    const type = searchType.value;
    const value = searchValue.value.trim();

    if (value === "") {
        alert("Enter Search Value");
        return;
    }

    const response = await fetch(
        `http://localhost:5000/employee/search?type=${type}&value=${value}`
    );

    const data = await response.json();

    if (data.count === 0) {

        alert("Employee Not Found");

        return;

    }

    loadEmployee(data.employees[0].employeeId);

}

async function loadEmployee(employeeId) {

    // Current Employee

    const employeeResponse = await fetch(
        `http://localhost:5000/employee/${employeeId}`
    );

    const employeeData = await employeeResponse.json();

    const employee = employeeData.employee;

    document.getElementById("employeeName").textContent =
        employee.employeeName;

    document.getElementById("employeeId").textContent =
        employee.employeeId;

    document.getElementById("designation").textContent =
        employee.designation;

    document.getElementById("billUnit").textContent =
        employee.billUnit;

    document.getElementById("status").textContent =
        employee.status;

    // Employee History

    const historyResponse = await fetch(
        `http://localhost:5000/employee/history/${employeeId}`
    );

    const historyData = await historyResponse.json();

    const table = document.getElementById("historyTable");

    table.innerHTML = "";

    historyData.history.forEach(record => {

        table.innerHTML += `

        <tr>

            <td>${new Date(record.createdAt).toLocaleDateString()}</td>

            <td>${record.fieldChanged}</td>

            <td>${record.oldValue}</td>

            <td>${record.newValue}</td>

            <td>${record.reason}</td>

        </tr>

        `;

    });

}

searchBtn.addEventListener("click", searchEmployee);