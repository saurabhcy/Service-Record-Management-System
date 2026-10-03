const payMatrix = {};

const startingPay = {
    1: 18000,
    2: 19900,
    3: 21700,
    4: 25500,
    5: 29200,
    6: 35400,
    7: 44900,
    8: 47600,
    9: 53100,
    10: 56100,
    11: 67700,
    12: 78800,
    13: 123100,
    14: 144200,
    15: 182200,
    16: 205400,
    17: 225000,
    18: 250000
};

for (let level = 1; level <= 18; level++) {

    payMatrix[level] = {};

    let pay = startingPay[level];

    for (let cell = 1; cell <= 40; cell++) {

        payMatrix[level][cell] = Math.round(pay);

        pay *= 1.03;      // 3% increment

    }
}

module.exports = payMatrix;