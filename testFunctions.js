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

describe("BASIC TESTS =>", function() {
    const testCases = [{
            testName: "Addition Int",
            testValue: '3 + 4',
            expectedValue: 7
        },
        {
            testName: "Addition Float",
            testValue: '5.6 + 9.4',
            expectedValue: 15.0
        },
        {
            testName: "Substract Int",
            testValue: '17 - 6',
            expectedValue: 11
        },
        {
            testName: "Substract Float",
            testValue: '15.0 - 6.9',
            expectedValue: 8.1
        },
        {
            testName: "Multiple Int",
            testValue: '5 * 12',
            expectedValue: 60
        },
        {
            testName: "Multiple Float",
            testValue: '1.2 * 1.3',
            expectedValue: 1.56
        },
        {
            testName: "Divide Int",
            testValue: '16 / 2',
            expectedValue: 8
        },
        {
            testName: "Substract Integer",
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

describe("BASIC TESTS =>", function() {
    const testCases = [{
            testName: "Addition Int",
            testValue: '3 + 4',
            expectedValue: 7
        },
        {
            testName: "Addition Float",
            testValue: '5.6 + 9.4',
            expectedValue: 15.0
        },
        {
            testName: "Substract Int",
            testValue: '17 - 6',
            expectedValue: 11
        },
        {
            testName: "Substract Float",
            testValue: '15.0 - 6.9',
            expectedValue: 8.1
        },
        {
            testName: "Multiple Int",
            testValue: '5 * 12',
            expectedValue: 60
        },
        {
            testName: "Multiple Float",
            testValue: '1.2 * 1.3',
            expectedValue: 1.56
        },
        {
            testName: "Divide Int",
            testValue: '16 / 2',
            expectedValue: 8
        },
        {
            testName: "Substract Integer",
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