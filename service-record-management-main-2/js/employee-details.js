// Read Employee ID from URL

const params = new URLSearchParams(window.location.search);

const employeeId = params.get("employeeId");

// Load Employee

async function loadEmployee() {

    try {

        const response = await fetch(

            `http://localhost:5000/employee/${employeeId}`

        );

        const data = await response.json();

        const employee = data.employee;

        document.getElementById("employeeName").textContent = employee.employeeName;

        document.getElementById("employeeId").textContent = employee.employeeId;

        document.getElementById("status").textContent = employee.status;

        document.getElementById("dob").textContent = employee.dob.substring(0,10);

        document.getElementById("gender").textContent = employee.gender;

        document.getElementById("employeeType").textContent = employee.employeeType;

        document.getElementById("pan").textContent = employee.panNumber;

        document.getElementById("aadhaar").textContent = employee.aadhaarNumber;

        document.getElementById("mobile").textContent = employee.mobile;

        document.getElementById("email").textContent = employee.email;

        document.getElementById("doj").textContent = employee.dateOfJoining.substring(0,10);

        document.getElementById("designation").textContent = employee.designation;

        document.getElementById("designationCode").textContent = employee.designationCode;

        document.getElementById("billUnit").textContent = employee.billUnit;

        document.getElementById("pc7Level").textContent = employee.pc7Level;

        document.getElementById("pc7Pay").textContent = employee.pc7Pay;

        document.getElementById("retirementDate").textContent = employee.retirementDate.substring(0,10);

        document.getElementById("bankName").textContent = employee.bankName;

        document.getElementById("accountNumber").textContent = employee.accountNumber;

        document.getElementById("ifsc").textContent = employee.ifscCode;

    }

    catch (error) {

        console.log(error);

    }

}

loadEmployee();