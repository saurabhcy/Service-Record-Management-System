const PDFDocument = require("pdfkit");
const Employee = require("../models/Employee");
const calculateSalary = require("../utils/calculateSalary");

const formatCurrency = (amount) => {

    return Number(amount).toLocaleString("en-IN", {
        maximumFractionDigits: 0
    });

};

const maskAccount = (account) => {

    if (!account) return "-";

    if (account.length <= 4) return account;

    return "XXXXXXXX" + account.slice(-4);

};

const line = (doc) => {

    doc.moveTo(50, doc.y)
       .lineTo(545, doc.y)
       .stroke();

    doc.moveDown(0.7);

};

const generatePayslip = async (req, res) => {

    try {

        const employee = await Employee.findOne({

            employeeId: req.params.employeeId

        });

        if (!employee) {

            return res.status(404).json({

                success: false,
                message: "Employee Not Found"

            });

        }

        const salary = calculateSalary(employee);

        const month = req.query.month || new Date().toISOString().slice(0,7);

        const doc = new PDFDocument({

            size: "A4",
            margin: 50

        });

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            `attachment; filename=Payslip-${employee.employeeId}.pdf`
        );

        doc.pipe(res);

        // ================= HEADER =================

        doc.font("Helvetica-Bold")
           .fontSize(18)
           .text("GOVERNMENT OF INDIA", {

                align: "center"

           });

        doc.fontSize(15)
           .text("MINISTRY OF RAILWAYS", {

                align: "center"

           });

        doc.fontSize(20)
           .text("NORTHERN RAILWAY", {

                align: "center"

           });

        doc.moveDown(0.4);

        doc.fontSize(14)
           .text("MONTHLY SALARY SLIP", {

                align: "center"

           });

        doc.moveDown();

        line(doc);

        doc.font("Helvetica")
           .fontSize(11);

        doc.text(`Salary Month : ${month}`,50);

        doc.text(`Generated : ${new Date().toLocaleDateString()}`,350);

        line(doc);

        doc.font("Helvetica-Bold")
           .fontSize(13)
           .text("EMPLOYEE INFORMATION");

        doc.moveDown(0.5);

        doc.font("Helvetica")
           .fontSize(11);

        doc.text(`Employee Name : ${employee.employeeName}`);

        doc.text(`Employee ID : ${employee.employeeId}`);

        doc.text(`Designation : ${employee.designation}`);

        doc.text(`Bill Unit : ${employee.billUnit}`);

        doc.text(`Pay Level : ${employee.payLevel}`);

        doc.text(`Pay Cell : ${employee.payCell}`);

        doc.text(`Employee Type : ${employee.employeeType}`);

        doc.text(`Status : ${employee.status}`);

        line(doc);
                // ================= EARNINGS =================

        doc.font("Helvetica-Bold")
           .fontSize(13)
           .text("EARNINGS");

        doc.moveDown(0.5);

        doc.font("Helvetica-Bold");

        doc.text("Description", 50, doc.y, { continued: true });

        doc.text("Amount (₹)", 400);

        line(doc);

        doc.font("Helvetica");

        doc.text("Basic Pay", 50, doc.y, { continued: true });
        doc.text(formatCurrency(salary.basicPay), 400);

        doc.text("Dearness Allowance (60%)", 50, doc.y, { continued: true });
        doc.text(formatCurrency(salary.da), 400);

        doc.text("House Rent Allowance (20%)", 50, doc.y, { continued: true });
        doc.text(formatCurrency(salary.hra), 400);

        doc.text("Transport Allowance", 50, doc.y, { continued: true });
        doc.text(formatCurrency(salary.transport), 400);

        line(doc);

        doc.font("Helvetica-Bold");

        doc.text("Gross Earnings", 50, doc.y, { continued: true });
        doc.text(formatCurrency(salary.grossPay), 400);

        doc.moveDown();

        // ================= DEDUCTIONS =================

        doc.font("Helvetica-Bold")
           .fontSize(13)
           .text("DEDUCTIONS");

        doc.moveDown(0.5);

        doc.font("Helvetica-Bold");

        doc.text("Description", 50, doc.y, { continued: true });

        doc.text("Amount (₹)", 400);

        line(doc);

        doc.font("Helvetica");

        const deductionName =
            employee.employeeType === "PF"
                ? "Provident Fund (PF)"
                : "National Pension Scheme (NPS)";

        doc.text(deductionName, 50, doc.y, { continued: true });

        doc.text(formatCurrency(salary.grossDeduction), 400);

        line(doc);

        doc.font("Helvetica-Bold");

        doc.text("Gross Deduction", 50, doc.y, { continued: true });

        doc.text(formatCurrency(salary.grossDeduction), 400);

        doc.moveDown(1);

        // ================= NET PAY BOX =================

        doc.rect(50, doc.y, 495, 40)
           .stroke();

        doc.fontSize(18)
           .font("Helvetica-Bold");

        doc.text(
            `NET PAY : ₹ ${formatCurrency(salary.netPay)}`,
            70,
            doc.y + 12
        );

        doc.moveDown(3);

        // ================= BANK DETAILS =================

        doc.fontSize(13)
           .text("BANK DETAILS");

        doc.moveDown(0.5);

        doc.font("Helvetica")
           .fontSize(11);

        doc.text(`Bank Name : ${employee.bankName}`);

        doc.text(`Account Number : ${maskAccount(employee.accountNumber)}`);

        doc.text(`IFSC Code : ${employee.ifscCode}`);

        line(doc);

        // ================= FOOTER =================

        doc.fontSize(10);

        doc.text(
            "This is a computer generated salary slip.",
            {
                align: "center"
            }
        );

        doc.text(
            "Northern Railway HR Management System",
            {
                align: "center"
            }
        );

        doc.end();

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    generatePayslip

};