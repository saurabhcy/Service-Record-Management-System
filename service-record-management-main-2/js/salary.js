const searchBtn = document.getElementById("searchBtn");
const searchType = document.getElementById("searchType");
const searchValue = document.getElementById("searchValue");

// Employee Details

const employeeName = document.getElementById("employeeName");
const employeeId = document.getElementById("employeeId");
const designation = document.getElementById("designation");
const billUnit = document.getElementById("billUnit");
const payLevel = document.getElementById("payLevel");
const basicPay = document.getElementById("basicPay");
const netSalary = document.getElementById("netSalary");

searchBtn.addEventListener("click", searchEmployee);

async function searchEmployee() {

    if (searchValue.value.trim() === "") {

        alert("Enter Search Value");

        return;

    }

    try {

        const response = await fetch(

            `http://localhost:5000/employee/search?type=${searchType.value}&value=${searchValue.value}`

        );

        const data = await response.json();

        if (!data.success || data.employees.length === 0) {

            alert("Employee Not Found");

            return;

        }

        // If more than one employee found
        if (data.employees.length > 1) {

            alert("Multiple employees found. Please search using Employee ID.");

            return;

        }

        loadSalary(data.employees[0].employeeId);

    }

    catch (error) {

        console.log(error);

    }

}

async function loadSalary(empId) {

    try {

        const response = await fetch(

            `http://localhost:5000/salary/${empId}`

        );

        const data = await response.json();

        if (!data.success) {

            alert(data.message);

            return;

        }

        const emp = data.employee;

        const salary = data.salary;

        employeeName.innerText = emp.employeeName;

        employeeId.innerText = emp.employeeId;

        designation.innerText = emp.designation;

        billUnit.innerText = emp.billUnit;

        payLevel.innerText = emp.payLevel;

        basicPay.innerText = salary.basicPay;

        netSalary.innerText = salary.netPay.toFixed(2);

    }

    catch (error) {

        console.log(error);

    }

}
const generateSlip = document.getElementById("generateSlip");

generateSlip.addEventListener("click", () => {

    if (employeeId.innerText === "--") {

        alert("Search an employee first.");

        return;

    }

    const month = document.getElementById("salaryMonth").value;

    window.open(

        `http://localhost:5000/payslip/${employeeId.innerText}?month=${month}`,

        "_blank"

    );

});