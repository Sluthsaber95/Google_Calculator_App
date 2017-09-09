const mocha = require("mocha");
const assert = require("chai").assert;

const degreeToRad = angle => {
    return angle * (Math.PI / 180);
};
const radToDegree = angle => {
    return angle * (180 / Math.PI);
};
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
const factorial = num => {
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
const prioritise = (str, propsName = []) => {
    let i = 0;
    return eval(str);
    const prioritising = (str, propsName) => {
        if (storedFunction[propsName[i]].regex.test(str)) {
            str = str.replace(storedFunction[propsName[i]].regex, storedFunction[propsName[i]].function);
            i === propsName.length - 1 ? i : i++;
            return prioritising(str, propsName);
        }
        return str;
    };
    return prioritising(str, propsName);
};


describe.skip("BASIC ARITHMETIC TESTS =>", function() {
    const testCases = [{
            testName: "Addition [Int]",
            testValue: '3 + 4',
            expectedValue: 7
        },
        {
            testName: "Addition [Float]",
            testValue: '5.6 + 9.4',
            expectedValue: 15.0
        },
        {
            testName: "Substract [Int]",
            testValue: '17 - 6',
            expectedValue: 11
        },
        {
            testName: "Substract [Float]",
            testValue: '15.0 - 6.9',
            expectedValue: 8.1
        },
        {
            testName: "Multiple [Int]",
            testValue: '5 * 12',
            expectedValue: 60
        },
        {
            testName: "Multiple [Float]",
            testValue: '1.2 * 1.3',
            expectedValue: 1.56
        },
        {
            testName: "Divide [Int]",
            testValue: '16 / 2',
            expectedValue: 8
        },
        {
            testName: "Divide [Float]",
            testValue: '21.6 / 3',
            expectedValue: 7.2
        }
    ];
    for (let i = 0; i < testCases.length; i++) { //assert.equal(true, true) //passed the test
        it(testCases[i].testName, function() {
            assert.equal(prioritise(testCases[i].testValue), testCases[i].expectedValue, "Expected prioritise(" + testCases[i].testValue + ") to return " + testCases[i].expectedValue);
        });
    }
});

describe.skip("INDIVIDUAL FUNCTION TESTS =>", function() {
    // all decimal values are kept to 4 d.p.
    const testCases = [{
            testName: "Degrees [Int] To Radian Conversion ",
            testValue: '360', // 4 d.p.
            expectedValue: 6.2832
        },
        {
            testName: "Degree [Float] to Radian Conversion",
            testValue: '360.1',
            expectedValue: 6.2849
        },
        {
            testName: "Radian [Int] to Degrees Conversion",
            testValue: '1',
            expectedValue: 57.2958
        },
        {
            testName: "Radian [Float] to Degrees Conversion",
            testValue: '1.1',
            expectedValue: 63.0254
        },
        {
            testName: "Factorial Int",
            testValue: '5',
            expectedValue: 120
        },
        // Factorial Float requires advanced mathematical knowledge
        {
            testName: "Percentage [Int] Conversion",
            testValue: '150%',
            expectedValue: 1.5
        },
        {
            testName: "Percentage [Float] Conversion",
            testValue: '150.1%',
            expectedValue: 1.501
        },
        // {
        //     testName: "Pi Constant",
        //     testValue: 'π',
        //     expectedValue: 3.1416
        // },
        // {
        //     testName: "Euler's Constant",
        //     testValue: 'e',
        //     expectedValue: 2.7183
        // },
        // By default, degrees is utilized for trigonometric functions
        {
            testName: "Sine [Int]",
            testValue: 'sin(90)',
            expectedValue: 1
        },
        {
            testName: "Sine [Float]",
            testValue: 'sin(45.2)',
            expectedValue: 0.7095
        },
        {
            testName: "Cosine [Int]",
            testValue: 'cos(360)',
            expectedValue: 1
        },
        {
            testName: "Cosine [Float]",
            testValue: 'cos(45.2)',
            expectedValue: 0.7046
        },
        {
            testName: "Tangent [Int]",
            testValue: 'tan(45)',
            expectedValue: 1
        },
        {
            testName: "Tangent [Int]",
            testValue: 'tan(45.2)',
            expectedValue: 1.007
        },
        {
            testName: "Log [Int]",
            testValue: 'log(1000)',
            expectedValue: 3
        },
        {
            testName: "Log [Float]",
            testValue: 'log(45.2)',
            expectedValue: 1.6551
        },
        {
            testName: "Natural Log [Int]",
            testValue: 'ln(2)',
            expectedValue: 0.6931
        },
        {
            testName: "Natural Log [Float]",
            testValue: 'ln(45.2)',
            expectedValue: 3.8111
        }
    ];
    for (let i = 0; i < testCases.length; i++) { //assert.equal(true, true) //passed the test
        it(testCases[i].testName, function() {
            assert.equal(prioritise(testCases[i].testValue), testCases[i].expectedValue, "Expected prioritise(" + testCases[i].testValue + ") to return " + testCases[i].expectedValue);
        });
    }
});

describe.only("POWER INDEX TESTS =>", function() {
    // all decimal values are kept to 4 d.p.
    const testCases = [{
            testName: "Power Base [Int] Index [Int]",
            testValue: "2^3",
            expectedValue: 8
        },
        {
            testName: "Power Base [Float] Index [Float]",
            testValue: "2.5^3.1",
            expectedValue: 17.1243
        },
        {
            testName: "Power Base Multiple Index [Float]",
            testValue: "2.5^3.1^1.7",
            expectedValue: 529.0930
        },
        {
            testName: "Power Base Multiple Index [Float]",
            testValue: "2.5^3.1^1.7",
            expectedValue: 529.0930
        },
        {
            testName: "Square Root [Int]",
            testValue: "4^0.5",
            expectedValue: 2
        },
        {
            testName: "Square Root [Float]",
            testValue: "45.2^0.5",
            expectedValue: 6.7231
        }
    ];
    for (let i = 0; i < testCases.length; i++) { //assert.equal(true, true) //passed the test
        it(testCases[i].testName, function() {
            assert.equal(prioritise(testCases[i].testValue), testCases[i].expectedValue, "Expected prioritise(" + testCases[i].testValue + ") to return " + testCases[i].expectedValue);
        });
    }
});