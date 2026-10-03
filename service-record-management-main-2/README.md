# Railway Service Record Management System

A web-based **Employee Service Record & HR Management System** developed during my Northern Railway internship. The system helps HR/Admin manage employee information, service records, salary details, onboarding, and leave-related information through a centralized portal.

## 🚀 Features

* 👤 Employee Management
* 📋 Employee Service Records
* 🆕 New Employee Onboarding
* 💰 Salary Management
* 🏖️ Leave Management
* 🔍 Employee Search
* 📊 HR Dashboard
* 🔐 Authentication
* 🧾 Payslip Management
* 📈 Pay Matrix / Salary Calculation

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Development Tools

* VS Code
* MongoDB Compass
* Postman
* Git & GitHub
* Nodemon

## 📁 Project Structure

```text
service-record/
│
├── Server/
│   ├── config/
│   │   ├── database.js
│   │   └── payMatrix.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── dashboardController.js
│   │   ├── employeeController.js
│   │   ├── payslipController.js
│   │   └── salaryController.js
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │   ├── Counter.js
│   │   ├── Employee.js
│   │   ├── EmployeeHistory.js
│   │   ├── HR.js
│   │   └── PayMatrix.js
│   │
│   ├── routes/
│   │
│   ├── utils/
│   │
│   └── app.js
│
├── css/
│
├── images/
│
├── js/
│   ├── dashboard.js
│   ├── employee-details.js
│   ├── employees.js
│   ├── leave.js
│   ├── login.js
│   ├── new-onboarding.js
│   ├── salary.js
│   └── service-record.js
│
├── pages/
│   ├── employee-details.html
│   ├── employees.html
│   ├── hr-dashboard.html
│   ├── login.html
│   ├── new-onboarding.html
│   ├── salary.html
│   └── service-record.html
│
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/hirdaylamba19/service-record-management.git
```

### 2. Navigate to the project

```bash
cd service-record-management
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project according to your local configuration.

> The `.env` file is intentionally excluded from GitHub to protect sensitive credentials.

### 5. Start the server

```bash
npm start
```

If the project uses Nodemon:

```bash
npm run dev
```

## 🔄 System Workflow

```text
HR/Admin
   │
   ▼
Login
   │
   ▼
HR Dashboard
   │
   ├── Employee Management
   │       ├── Search Employee
   │       ├── View Details
   │       └── Update Details
   │
   ├── New Onboarding
   │
   ├── Service Record
   │
   ├── Salary Management
   │
   └── Leave Management
            │
            ▼
        MongoDB
```

## 💰 Salary Management

The system includes salary calculation based on the applicable pay matrix and employee information.

The salary module handles:

* Basic Pay
* Dearness Allowance (DA)
* House Rent Allowance (HRA)
* Transport Allowance
* PF/NPS deductions
* Gross Pay
* Gross Deduction
* Net Pay
* Pay Matrix levels
* Payslip generation

## 🔐 Security

Sensitive configuration such as database credentials and environment variables are not committed to the repository.

The `.gitignore` file excludes:

```text
node_modules/
.env
.env.*
```

## 🎯 Project Objective

The objective of this project is to provide a centralized digital platform for managing employee service records and HR-related information, reducing manual record management and improving accessibility of employee data.

## 👨‍💻 Developer

**Hirday Lamba**
**&**
**Saurabh Chaudhary**

Developed as part of my **Northern Railway Internship**.
