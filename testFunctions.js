const mocha = require("mocha");
const assert = require("chai").assert;
const regexUsed = require("./regexTests.js").regexTrain;

const toggleAngle = (angleUnits) => {
    return angleUnits === "Radian" ? 1 : (Math.PI / 180);
}
const factorial = num => {
    if (typeof num !== "number" || isNaN(num)) {
        return NaN;
    }
    // The decision was to made using the Google Calculator as a benchmark
    // The number 170 was the tipping point at which the Google Calculator displated infinity
    else if (num > 170) {
        return Infinity;
    }
    let val = 1;
    const calcFactorial = num => {
        if (num > 1) {
            val *= num;
            num--;
            return calcFactorial(num);
        }
        return val === 0 ? 1 : val;
    };
    return calcFactorial(num);
};
const percentage = num => {
    return num / 100;
}

const storedFunction = {
    "percentage": {
        "regex": /(\d+%)/g, //1) 
        "function": (match, p1) => {
            return p1.slice(0, p1.length - 1) / 100;
        }
    },
    "factorial": {
        "regex": /(\d+!)/g,
        "function": (match, p1) => {
            return factorial(p1.slice(0, p1.length - 1));
        }
    },
    "log": {
        "regex": /(log\()(\d+\.?\d+)(\))/g,
        "function": (match, p1, p2) => {
            return Math.log10(p2);
        }
    },
    "sine": {
        "regex": /(sin\()(\d+\.?\d+)(\))/g,
        "function": (match, p1, p2) => {
            return Math.sin(p2);
        }
    }
};
// console.log(plus);

const prioritise = regexUsed;


describe.only("BASIC ARITHMETIC TESTS =>", function() {
    const testCases = [{
            name: "Addition [Int]",
            value: '3+4',
            expected: 7
        },
        {
            name: "Addition [Float]",
            value: '5.6+9.4',
            expected: 15.0
        },
        {
            name: "Substract [Int]",
            value: '17-6',
            expected: 11
        },
        {
            name: "Substract [Float]",
            value: '15.0-6.9',
            expected: 8.1
        },
        {
            name: "Multiple [Int]",
            value: '5*12',
            expected: 60
        },
        {
            name: "Multiple [Float]",
            value: '1.2*1.3',
            expected: 1.56
        },
        {
            name: "Divide [Int]",
            value: '16/2',
            expected: 8
        },
        {
            name: "Divide [Float]",
            value: '21.6/3',
            expected: 7.2
        }
    ];
    for (let i = 0; i < testCases.length; i++) { //assert.equal(true, true) //passed the test
        it(testCases[i].name, function() {
            assert.equal(prioritise(testCases[i].value), testCases[i].expected, "Expected prioritise(" + testCases[i].value + ") to return " + testCases[i].expected);
        });
    }
});

describe.only("INDIVIDUAL FUNCTION + CONSTANT TESTS =>", function() {
    // all decimal values are kept to 4 d.p.
    const testCases = [{
            name: "Factorial Int",
            value: '5!',
            expected: 120
        },
        // Factorial Float requires advanced mathematical knowledge
        {
            name: "Percentage [Int] Conversion",
            value: '150%',
            expected: 1.5
        },
        {
            name: "Percentage [Float] Conversion",
            value: '150.1%',
            expected: 1.501
        },
        {
            name: "Pi Constant",
            value: 'π',
            expected: 3.14159265359
        },
        {
            name: "Euler's Constant",
            value: 'e',
            expected: 2.71828182846
        },
        // By default, radian is utilized for trigonometric functions
        {
            name: "Sine [Int]",
            value: 'sin(π/2)',
            expected: 1
        },
        {
            name: "Sine [Float]",
            value: 'sin((π+2)/2)',
            // π+2 => 5.14159265359; (π+2)/2 => 2.57079632679
            expected: 0.540302305868
        },
        {
            name: "Cosine [Int]",
            value: 'cos(2π)',
            expected: 1
        },
        {
            name: "Cosine [Float]",
            value: 'cos((π+2)/2)',
            expected: -0.841470984808
                //
        }, {
            name: "Tangent [Int]",
            value: 'tan(π/4)',
            expected: 1
        }, {
            name: "Tangent [Float]",
            value: 'tan((π+2)/4)',
            expected: 3.40822344234
        }, {
            name: "Log [Int]",
            value: 'log(1000)',
            expected: 3
        },
        {
            name: "Log [Float]",
            value: 'log(45.2)',
            expected: 1.65513843481
        }, {
            name: "Natural Log [Int]",
            value: 'ln(2)',
            expected: 0.693147180560
        }, {
            name: "Natural Log [Float]",
            value: 'ln(45.2)',
            expected: 3.81109708684
        }
    ];
    for (let i = 0; i < testCases.length; i++) {
        it(testCases[i].name, function() {
            assert.equal(prioritise(testCases[i].value), testCases[i].expected, "Expected prioritise(" + testCases[i].value + ") to return " + testCases[i].expected);
        });
    }
});

describe.only("POWER INDEX TESTS =>", function() {
    // all decimal values are kept to 4 d.p.
    const testCases = [{
            name: "Power Base [Int] Index [Int]",
            value: "2^3",
            expected: 8
        },
        {
            name: "Power Base [Float] Index [Float]",
            value: "2.5^3.1",
            expected: 17.1243472873
        },
        {
            name: "Power Base Multiple Index [Float]",
            value: "2.5^3.1^1.7",
            expected: 529.092997828
        },
        {
            name: "Square Root [Int]",
            value: "4^0.5",
            expected: 2
        },
        {
            name: "Square Root [Float]",
            value: "45.2^0.5",
            expected: 6.72309452559
        },
        {
            name: "Exponent [Int]",
            value: "10^2",
            expected: 100
        },
        {
            name: "Exponent [Float]",
            value: "10^0.6",
            expected: 3.98107170553
        }
    ];
    for (let i = 0; i < testCases.length; i++) {
        it(testCases[i].name, function() {
            assert.equal(prioritise(testCases[i].value), testCases[i].expected, "Expected prioritise(" + testCases[i].value + ") to return " + testCases[i].expected);
        });
    }
    it("5.6+3.3^2.5^1.7/7.8^4.5/6.7-9.8", function() {
        assert.equal(prioritise("5.6+3.3^2.5^1.7/7.8^4.5/6.7-9.8"), -4.19581850381)
    });
    it("2^3", function() {
        assert.equal(prioritise("2^3"), "8")
    });
    it("3.3^2.5^1.7/6.7-9.8", function() {
        assert.equal(prioritise("3.3^2.5^1.7/6.7-9.8"), 33.4272310234)
    });
    it("-2^-3", function() {
        assert.equal(prioritise("-2^-3"), "-0.125")
    });
    it("-2.5^-3.6", function() {
        assert.equal(prioritise("-2.5^-3.6"), "-0.036933117591")
    });
    it("-2.5^-3.6-2.4", function() {
        assert.equal(prioritise("-2.5^-3.6^-2.4"), "-0.958529198614")
    });
    it("10^1-5", function() {
        assert.equal(prioritise("10^1-5"), "5")
    });
    it("10^2-5", function() {
        assert.equal(prioritise("10^2-5"), "95")
    });
    it("10^1+5", function() {
        assert.equal(prioritise("10^1+5"), "15")
    });
    it("10^2+5", function() {
        assert.equal(prioritise("10^2+5"), "105")
    });
});

describe.skip("2 COMBINATION FEATURES =>", function() {

    // Set Tests
    const testCases = true ? [{
        name: "Factor + Func",
        value: "log(10!)",
        expected: 6.55976303288
    }, {
        name: "Func + Arith",
        value: "log(log(1))",
        expected: -Infinity
    }, {
        name: "Func + Arith",
        value: "ln(13/11)",
        expected: 0.167054084663
    }, {
        name: "Func + Arith",
        value: "log(14)/14",
        expected: 0.081866288263
    }, {
        name: "Factor [Float]",
        value: "14.12!",
        expected: 14.12
    }, {
        name: "Percent [Float]",
        value: "14.12%",
        expected: 0.1412
    }, ] : [{
            name: "Func + Arith",
            value: "(15%)!",
            expected: 0.15
        },
        // {
        //     name: "Func + Arith",
        //     value: "15!%",
        //     expected: 13076743680
        // },
    ];
    for (let i = 0; i < testCases.length; i++) {
        it(testCases[i].name, function() {
            assert.equal(prioritise(testCases[i].value), testCases[i].expected);
        });
    }
    // Random Tests
    const randomTestCase = 10;

    const randomTestGroup = () => {
        const testGroup = [
            { unitName: "Factor", testUnit: ["!", "%"], method: [factorial, percentage] },
            { unitName: "Func", testUnit: ["sin(", "cos(", "tan(", "ln(", "log("], method: [Math.sin, Math.cos, Math.tan, Math.log, Math.log10] },
            { unitName: "Power", testUnit: ["^"], method: [Math.pow] },
            { unitName: "Arith", testUnit: ["+", "-", "*", "/"], method: [] }
        ];
        let i = Math.floor(Math.random() * testGroup.length);
        let j = Math.floor(Math.random() * testGroup[i].testUnit.length)
        return {
            name: testGroup[i].unitName,
            unit: testGroup[i].testUnit[j],
            method: testGroup[i].method[j]
        }
    }

    const createTestCase = () => {
        let halfChance = Math.random() > .5 ? true : false;

        //[feature + value counter, numerical value calculated]
        let [i, calculateTotal] = [0, 0];

        // toggles the amount of feature per test
        let k = 2;

        // You can toggle angle from Radians to Angle; vice versa
        let angleUnits = toggleAngle("Radian");

        // Description of each test case
        let endStr = "";

        // Produce sets of random Values and random functions to pick from 
        let value = [...Array(6).keys()].map(x => { return Math.floor(Math.random() * 20 + 1); });
        let feature = [...Array(6).keys()].map(x => { return randomTestGroup(); });

        // used to;
        // a) append possible combinations as strings
        // b) calculate the end numerical value
        let testValue = () => {
            switch (feature[i].name) {
                case "Factor":
                    // a! or (a + b)!
                    endStr === "" ? endStr = value[i] + feature[i].unit : endStr = "(" + endStr + ")" + feature[i].unit;
                    calculateTotal = calculateTotal === 0 ? calculateTotal = feature[i].method(value[i]) : calculateTotal = feature[i].method(calculateTotal);
                    i++;
                    break;
                case "Func":
                    // f(x)
                    endStr === "" ? endStr = feature[i].unit + value[i] + ")" : endStr = feature[i].unit + endStr + ")";
                    if (feature[i].unit === "sin(" || feature[i].unit === "cos(" || feature[i].unit === "tan(") {
                        calculateTotal = calculateTotal === 0 ? calculateTotal = feature[i].method(angleUnits * value[i]) : calculateTotal = feature[i].method(angleUnits * calculateTotal);
                        i++;
                    } else {
                        calculateTotal = calculateTotal === 0 ? calculateTotal = feature[i].method(value[i]) : calculateTotal = feature[i].method(calculateTotal);
                        i++;
                    }
                    break;
                case "Power":
                    // a ^ y or (a + b) ^ y
                    endStr === "" ? endStr = value[i] + feature[i].unit + value[i + 1] : endStr = "(" + endStr + ")" + feature[i].unit + value[i + 1];
                    calculateTotal = calculateTotal === 0 ? calculateTotal = feature[i].method(value[i], value[i + 1]) : calculateTotal = feature[i].method(calculateTotal, value[i + 1]);
                    i++;
                    break;
                case "Arith":
                    // You can get a + b or b + a combinations, where '+' is also representative of the other arithmetic operators '-', '*', '/' 
                    if (endStr === "") {
                        endStr = value[i] + feature[i].unit + value[i + 1];
                    } else {
                        halfChance ? endStr = endStr + feature[i].unit + value[i + 1] : endStr = value[i + 1] + feature[i].unit + endStr;
                    }
                    if (calculateTotal === 0) {
                        calculateTotal = value[i] + feature[i].unit + value[i + 1]
                    } else {
                        halfChance ? calculateTotal = calculateTotal + feature[i].unit + value[i + 1] : calculateTotal = value[i + 1] + feature[i].unit + calculateTotal;
                    }
                    i++;
                    break;
            }

            // As Arithmetic operators are calculated last
            if (feature[i + 1].name !== "Arith") {
                calculateTotal = eval(calculateTotal);
            }

            // These tests require a combination of 2, meaning other features, for this current test
            return i === k ? [feature[0], feature[1], endStr, eval(calculateTotal)] : testValue();
        }
        return testValue();
    }
    for (let i = 0; i < randomTestCase; i++) {
        let storeValue = createTestCase();
        const testCase = {
            name: JSON.stringify(storeValue[0].name) + " & " + JSON.stringify(storeValue[1].name),
            value: storeValue[2],
            expected: storeValue[3]
        };
        it(testCase.name, function() {
            assert.equal(prioritise(testCase.value), testCase.expected);
        });
    }
});

describe.only("3 COMBINATION FEATURES =>", function() {

    // Set Tests
    const testCases = [{
        name: "Factor + Func",
        value: "log(10!)",
        expected: 6.5598
    }];
    for (let i = 0; i < testCases.length; i++) {
        it(testCases[i].name, function() {
            assert.equal(prioritise(testCases[i].value), testCases[i].expected);
        });
    }
    // Random Tests
    const randomTestCase = 10;

    const testGroup = [
        { unitName: "Factor", testUnit: ["!", "%"], method: [factorial, percentage] },
        { unitName: "Func", testUnit: ["sin(", "cos(", "tan(", "ln(", "log("], method: [Math.sin, Math.cos, Math.tan, Math.log, Math.log10] },
        { unitName: "Power", testUnit: ["^"], method: [Math.pow] },
        { unitName: "Arith", testUnit: ["+", "-", "*", "/"], method: [] }
    ];
    const randomTestGroup = () => {
        let i = Math.floor(Math.random() * testGroup.length);
        let j = Math.floor(Math.random() * testGroup[i].testUnit.length)
        return {
            name: testGroup[i].unitName,
            unit: testGroup[i].testUnit[j],
            method: testGroup[i].method[j]
        }
    }

    const createTestCase = () => {
        //[feature + value counter, numerical value calculated]
        let [i, calculateTotal] = [0, 0];

        // toggles the amount of feature per test
        let k = 3;

        // You can toggle angle from Radians to Angle; vice versa
        let angleUnits = toggleAngle("Radian");

        // Description of each test case
        let endStr = "";

        // Produce sets of random Values and random functions to pick from 
        let value = [...Array(6).keys()].map(x => { return Math.floor(Math.random() * 20 + 1); });
        let feature = [...Array(6).keys()].map(x => { return randomTestGroup(); });

        // used to;
        // a) append possible combinations as strings
        // b) calculate the end numerical value
        let testValue = () => {
            switch (feature[i].name) {
                case "Factor":
                    // a! or (a + b)!
                    endStr === "" ? endStr = value[i] + feature[i].unit : endStr = "(" + endStr + ")" + feature[i].unit;
                    calculateTotal = calculateTotal === 0 ? calculateTotal = feature[i].method(value[i]) : calculateTotal = feature[i].method(calculateTotal);
                    break;
                case "Func":
                    // f(x)
                    endStr === "" ? endStr = feature[i].unit + value[i] + ")" : endStr = feature[i].unit + endStr + ")";
                    if (feature[i].unit === "sin(" || feature[i].unit === "cos(" || feature[i].unit === "tan(") {
                        calculateTotal = calculateTotal === 0 ? calculateTotal = feature[i].method(angleUnits * value[i]) : calculateTotal = feature[i].method(angleUnits * calculateTotal);
                    } else {
                        calculateTotal = calculateTotal === 0 ? calculateTotal = feature[i].method(value[i]) : calculateTotal = feature[i].method(calculateTotal);
                    }
                    break;
                case "Power":
                    // a ^ y or (a + b) ^ y
                    endStr === "" ? endStr = value[i] + feature[i].unit + value[i + 1] : endStr = "(" + endStr + ")" + feature[i].unit + value[i + 1];
                    calculateTotal = calculateTotal === 0 ? calculateTotal = feature[i].method(value[i], value[i + 1]) : calculateTotal = feature[i].method(calculateTotal, value[i + 1]);
                    break;
                case "Arith":
                    // You can get a + b or b + a combinations, where '+' is also representative of the other arithmetic operators '-', '*', '/' 
                    if (endStr === "") {
                        endStr = value[i] + value[i];
                    }
                    if (calculateTotal === 0) {
                        calculateTotal = value[i] + feature[i].unit + value[i + 1]
                    } else {
                        calculateTotal = calculateTotal + feature[i].unit + value[i];
                    }
                    if (feature[i + 1].name !== "Arith") {
                        calculateTotal = eval(calculateTotal);
                    }
                    break;
            }

            // As Arithmetic operators are calculated last
            i++;
            // These tests require a combination of 2, meaning other features, for this current test
            return i === k ? [feature[0], feature[1], feature[2], endStr, eval(calculateTotal)] : testValue();
        }
        return testValue();
    }
    for (let j = 0; j < randomTestCase; j++) {
        let storeValue = createTestCase();
        const testCase = {
            name: JSON.stringify(storeValue[0].name) + " + " + JSON.stringify(storeValue[1].name) + " + " + JSON.stringify(storeValue[2].name),
            value: storeValue[3],
            expected: storeValue[4]
        };
        it(testCase.name, function() {
            assert.equal(prioritise(testCase.value), testCase.expected);
        });
    }
});

describe.only("ROUNDING FEATURE =>", function() {

    const testCase = [{
        name: "0.9999999999999999", //16
        value: "0.9999999999999999",
        expected: 1
    }, {
        name: "0.999999999999999", //15
        value: "0.999999999999999",
        expected: 1
    }, {
        name: "0.99999999999999", //14
        value: "0.99999999999999",
        expected: 1
    }, {
        name: "0.9999999999999", //13
        value: "0.9999999999999",
        expected: 1
    }, {
        name: "0.999999999999", //12
        value: "0.999999999999",
        expected: 1
    }, {
        name: "0.99999999999", //11
        value: "0.99999999999",
        expected: 1
    }, {
        name: "0.9999999999", //10
        value: "0.9999999999",
        expected: 1
    }, {
        name: "0.999999999", //9
        value: "0.999999999",
        expected: 1
    }, {
        name: "0.99999999", //8
        value: "0.99999999",
        expected: 1
    }, {
        name: "0.99999", //5
        value: "0.99999",
        expected: 1
    }, {
        name: "2.99999", //5
        value: "2.99999",
        expected: 3
    }, {
        name: "20.99999", //5
        value: "20.99999",
        expected: 21
    }, {
        name: "20.99000000000", //5
        value: "20.99",
        expected: 20.99
    }, {
        name: "20000", //5
        value: "200000",
        expected: 200000
    }, {
        name: "2000000", //5
        value: "2000000",
        expected: 2000000
    }, {
        name: "2000000000000000000000", //5
        value: "2000000000000000000000",
        expected: 2e+21
    }, ];

    for (let i = 0; i < testCase.length; i++) {
        it(testCase[i].name, function() {
            assert.equal(prioritise(testCase[i].value), testCase[i].expected);
        });
    }
});

describe.only("SPECIFIC FEATURE =>", function() {

    const testCase = {
        name: "(12/11)^7",
        value: "(12/11)^7",
        expected: 0.19917907876332352
    };
    it(testCase.name, function() {
        assert.equal(prioritise(testCase.value), testCase.expected);
    });
});


/*
{
        name: "log(log(1))",
        value: "log(log(1))",
        expected: -Infinity
    }


*/

// {
//     name: "Degrees [Int] To Radian Conversion ",
//     value: '360', // 4 d.p.
//     expected: 6.2832
// },
// {
//     name: "Degree [Float] to Radian Conversion",
//     value: '360.1',
//     expected: 6.2849
// },
// {
//     name: "Radian [Int] to Degrees Conversion",
//     value: '1',
//     expected: 57.2958
// },
// {
//     name: "Radian [Float] to Degrees Conversion",
//     value: '1.1',
//     expected: 63.0254
// },