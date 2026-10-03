function calculateSalary(employee) {

    const basicPay = employee.basicPay;

    if (!basicPay) {
        throw new Error("Basic Pay not found");
    }

    const da = basicPay * 0.60;

    const hra = basicPay * 0.20;

    const transport = 3600 + (3600 * 0.60);

    const grossPay =
        basicPay +
        da +
        hra +
        transport;

    let grossDeduction = 0;

    if (employee.employeeType === "PF") {

        grossDeduction = basicPay * 0.12;

    } else {

        grossDeduction = (basicPay + da) * 0.10;

    }

    const netPay = grossPay - grossDeduction;

    return {

        basicPay,
        da,
        hra,
        transport,
        grossPay,
        grossDeduction,
        netPay

    };

}

module.exports = calculateSalary;