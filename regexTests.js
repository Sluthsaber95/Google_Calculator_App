const mocha = require('mocha');
const assert = require('chai').assert;

// test different string combinations and see whether the regex can match that correctly

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

const regexTrain = (str) => {
    const regex = /(\(.*\))/g
    return regex.exec(str)[0];
    // if (str.match(regex)) {
    //     return true;
    // } else {
    //     return false;
    // }
}

describe("REGEX STRING TESTS", function() {
    const testCase = [{
        name: "Parenthesise + Arithmetic",
        value: "(3 + 4)",
        expected: true
    }];
    for (let i = 0; i < testCase.length; i++) {
        it(testCase[i].name, function() {
            assert.equal(regexTrain(testCase[i].value), testCase[i].expected);
        });
    }
});