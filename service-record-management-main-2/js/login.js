const form = document.getElementById("loginForm");

const role = document.getElementById("role");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");
const usernameLabel = document.getElementById("usernameLabel");

// Change label according to role

role.addEventListener("change", () => {

    if (role.value === "Employee") {

        usernameLabel.innerText = "Employee ID";

        username.placeholder = "Enter Employee ID";

    } else {

        usernameLabel.innerText = "Username";

        username.placeholder = "Enter Username";

    }

});

// Login

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const response = await fetch(

        "http://localhost:5000/auth/login",

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                role: role.value,

                username: username.value,

                password: password.value

            })

        }

    );

    const data = await response.json();

    if (data.success) {

        alert("Login Successful");

       window.location.href = "/pages/hr-dashboard.html";

    }

    else {

        loginMessage.style.color = "red";

        loginMessage.innerText = data.message;

    }

});