const form = document.getElementById("onboardingForm");

const dob = document.getElementById("dob");
const retirementDate = document.getElementById("retirementDate");

const payLevel = document.getElementById("payLevel");
const payCell = document.getElementById("payCell");
const basicPay = document.getElementById("basicPay");

const generateBtn = document.getElementById("generateEmployeeId");
const employeeId = document.getElementById("employeeId");
const billUnit = document.getElementById("billUnit");

// -------------------------------
// Create 40 Pay Cells
// -------------------------------

for (let i = 1; i <= 40; i++) {

    payCell.innerHTML += `
        <option value="${i}">
            ${i}
        </option>
    `;

}

// -------------------------------
// Calculate Retirement Date
// -------------------------------

dob.addEventListener("change", () => {

    if (!dob.value) return;

    let date = new Date(dob.value);

    date.setFullYear(date.getFullYear() + 60);

    date.setMonth(date.getMonth() + 1);

    date.setDate(0);

    retirementDate.value =
        date.toISOString().split("T")[0];

});

// -------------------------------
// Show Basic Pay
// -------------------------------

async function loadBasicPay() {

    if (!payLevel.value || !payCell.value) {

        basicPay.value = "";

        return;

    }

    const response = await fetch(

        `http://localhost:5000/salary/basic-pay?level=${payLevel.value}&cell=${payCell.value}`

    );

    const data = await response.json();

    basicPay.value = data.basicPay;

}

payLevel.addEventListener("change", loadBasicPay);

payCell.addEventListener("change", loadBasicPay);



// -------------------------------
// Generate Employee ID
// -------------------------------

generateBtn.addEventListener("click", async () => {

    if (billUnit.value.trim() === "") {

        alert("Please enter Bill Unit first.");

        return;

    }

    const response = await fetch(

        "http://localhost:5000/employee/generate-id",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                billUnit: billUnit.value

            })

        }

    );

    const data = await response.json();

    if (data.success) {

        employeeId.value = data.employeeId;

    }

    else {

        alert(data.message);

    }

});

// -------------------------------
// Save Employee
// -------------------------------

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const employee = {

        employeeId: employeeId.value,

        employeeName:
            document.getElementById("employeeName").value,

        gender:
            document.getElementById("gender").value,

        dob:
            document.getElementById("dob").value,

        employeeType:
            document.getElementById("employeeType").value,

        panNumber:
            document.getElementById("panNumber").value,

        aadhaarNumber:
            document.getElementById("aadhaarNumber").value,

        mobile:
            document.getElementById("mobileNumber").value,

        email:
            document.getElementById("email").value,

        billUnit:
            document.getElementById("billUnit").value,

        dateOfJoining:
            document.getElementById("dateOfJoining").value,

        designation:
            document.getElementById("designation").value,

        designationCode:
            document.getElementById("designationCode").value,

        status:
            document.getElementById("status").value,

        payLevel:
            Number(payLevel.value),

        payCell:
            Number(payCell.value),

            basicPay:
    Number(basicPay.value),

        bankName:
            document.getElementById("bankName").value,

        accountNumber:
            document.getElementById("accountNumber").value,

        ifscCode:
            document.getElementById("ifscCode").value

    };

    const response = await fetch(

        "http://localhost:5000/employee/create",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(employee)

        }

    );

    const data = await response.json();

    alert(data.message);

    if (data.success) {

        window.location.href =
            "/pages/employees.html";

    }

});