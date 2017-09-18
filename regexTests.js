(function() {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // If the value is negative...
        if (value < 0) {
            return -decimalAdjust(type, -value, exp);
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();

const mocha = require('mocha');
const assert = require('chai').assert;

// test different string combinations and see whether the regex can match that correctly
const factorial = num => {
    if (typeof num !== "number" || isNaN(num)) {
        return NaN;
    }
    // The decision was to make the Max number of calls to the stack being under 10000, such as Chrome 11034, Firefox 50994
    else if (num > 10000) {
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

const storedFunction = {
    "percentage": {
        "regex": /([-+]?[0-9]*\.?[0-9]+[\%])/g,
        "function": (match, p1) => {
            // To get rid of the floating point error at this stage, multiply by 10 and divide 1000
            // Rather than just dividing it by 100
            return (p1.slice(0, p1.length - 1) * 10) / (1000);
        }
    },
    "factorial": {
        "regex": /([-+]?[0-9]*\.?[0-9]+[\!])/g,
        "function": (match, p1) => {
            return factorial(p1.slice(0, p1.length - 1));
        }
    },
    "exponent": {
        "regex": /^([-+]?[0-9]*\.?[0-9]+[^][-+]?[0-9]*\.?[0-9]+)+$/g,
        "function": () => { return undefined }
    },
    "log": {
        "regex": /(log\([-+]?[0-9]*\.?[0-9]+\))/g,
        "function": (match, p1, p2) => {
            return Math.log10(p2);
        }
    },
    "natural-log": {
        "regex": /(ln\([-+]?[0-9]*\.?[0-9]+\))/g,
        "function": (match, p1, p2) => {
            return Math.log(p2);
        }
    },
    "sine": {
        "regex": /(sin\()(\d+\.?\d+)(\))/g,
        "function": (match, p1, p2) => {
            return Math.sin(p2);
        }
    },
    "cosine": {
        "regex": /(cos\()(\d+\.?\d+)(\))/g,
        "function": (match, p1, p2) => {
            return Math.cos(p2);
        }
    },
    "tangent": {
        "regex": /(tan\()(\d+\.?\d+)(\))/g,
        "function": (match, p1, p2) => {
            return Math.tan(p2);
        }
    },
    "arithmetic": {
        "regex": /\(?([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)\)?/g,
        "function": (match) => {
            return eval(match);
        }
    }
};

const regexTrain = (str) => {

    let total = "";
    let endRegex = "";
    let newStr = "";
    let i = 0;
    do {
        //console.log(str);
        i++;
        if (storedFunction.factorial.regex.test(str)) {
            factorialDetected = /([-+]?[0-9]*\.?[0-9]+[\!])/g [Symbol.match](str);
            for (let j = 0; j < factorialDetected.length; j++) {
                let value = /^([-+]?[0-9]*[\!])$/g.test(factorialDetected[j]) ? parseInt(/([-+]?[0-9]*[\!])/g.exec(factorialDetected[j])[0]) :
                    parseFloat(/([-+]?[0-9]*\.?[0-9]+[\!])/g.exec(factorialDetected[j])[0]);
                // console.log(value);
                newStr = factorial(value) + "";
                // console.log(newStr);
                str = str.replace(/([0-9]*\.?[0-9]+[\!])/, newStr);
            }
            continue;
        }
        if (storedFunction.percentage.regex.test(str)) {
            percentageDetected = /([-+]?[0-9]*\.?[0-9]+[\%])/g [Symbol.match](str);
            // console.log(percentageDetected)
            for (let j = 0; j < percentageDetected.length; j++) {
                let value = /^([-+]?[0-9]*[\%])$/g.test(str) ? parseInt(/([-+]?[0-9]*[\%])/g.exec(str)[0]) :
                    parseFloat(/([-+]?[0-9]*\.?[0-9]+[\%])/g.exec(str)[0]);
                newStr = value / 100 + "";
                str = str.replace(/([-+]?[0-9]*\.?[0-9]+[\%])/g, newStr);
                console.log(str);
            }
            continue;

        }
        // console.log(/^([-+]?[0-9]*\.?[0-9][\^])+([-+]?[0-9]*\.?[0-9])+$/g.test(str));
        // console.log(str);
        if (/^([-+]?[0-9]*\.?[0-9])+[^]+([-+]?[0-9]*\.?[0-9])+$/g.test(str) && !/\(?([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)\)?/g.test(str)) {
            // console.log("Regex not detected??")
            exponentDetected = /([-+]?[0-9]*\.?[0-9]+)/g [Symbol.match](str);
            exponentDetected = /([-+]?[0-9]*\.?[0-9]+)/g [Symbol.match](str);
            for (let j = exponentDetected.length - 1; j > 0; j--) {
                // console.log(j);
                let exp = /^([-+]?[0-9]*[\%])$/g.test(exponentDetected[j]) ? parseInt(exponentDetected[j]) :
                    parseFloat(exponentDetected[j]);
                let base = /^([-+]?[0-9]*[\%])$/g.test(exponentDetected[j - 1]) ? parseInt(exponentDetected[j - 1]) :
                    parseFloat(exponentDetected[j - 1]);
                newStr = j == exponentDetected.length - 1 ? Math.pow(base, exp) : Math.pow(base, newStr);
                if (j > 1) {
                    continue;
                }
                // console.log(newStr);
                str = str.replace(/^([-+]?[0-9]*\.?[0-9])+[^]+([-+]?[0-9]*\.?[0-9])+$/g, newStr);
                console.log(str);
            }
            continue;
        }
        break;
    }
    while (!/^([-+]?[0-9]*\.*[0-9]+?)$/.test(str) || i == 3);
    // console.log(storedFunction.arithmetic.regex.test(str));
    // console.log(typeof str, str);
    return /\(?([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)\)?/g.test(str) ? Math.round10(eval(str), -9) : Math.round10(eval(str), -9);
}

describe("REGEX STRING TESTS", function() {
    const testCase = [{
            name: "Parenthesise + Arithmetic",
            value: "(3+4)",
            expected: 7
        },
        // {
        //     name: "Factorial",
        //     value: "6!",
        //     expected: 720
        // },
        // {
        //     name: "Multiple Factorials",
        //     value: "6!+8!+9!",
        //     expected: 403920
        // },
        // {
        //     name: "Percentage + Factorial",
        //     value: "6%!",
        //     expected: 1
        // },
        // {
        //     name: "Factorial + Percentage",
        //     value: "6!%",
        //     expected: 7.2
        // },
        // {
        //     name: "Factorial + Percentage + Arithmetic Assortment",
        //     value: "6!%*9+6/2",
        //     expected: 67.8
        // },
        // {
        //     name: "Factorial + Percentage + Arithmetic Assortment",
        //     value: "6!%*1+6/2",
        //     expected: 10.2
        // }
        // {
        //     name: "Simple Power",
        //     value: "4^4",
        //     expected: 256
        // },
        // {
        //     name: "Complex Power",
        //     value: "4.5^.2^.3^5.2",
        //     expected: 4.479273878
        // },
        // {
        //     name: "Factorial + Complex Power",
        //     value: "4!^.2^.3^5.2",
        //     expected: 23.767033491
        // },
        // {
        //     name: "Percentage + Complex Power",
        //     value: "4.5%^.2^.3^5.2",
        //     expected: 0.045430361
        // },
        // {
        //     name: "Percentage + Complex Power + Factorial",
        //     value: "4%^.2^.3^5!",
        //     expected: 0.04
        // },
        // {
        //     name: "Percentage + Complex Power",
        //     value: "4!^.2^.3^5.2%",
        //     expected: 2.015415043
        // }, 
    ];
    for (let i = 0; i < testCase.length; i++) {
        it(testCase[i].name, function() {
            assert.equal(regexTrain(testCase[i].value), testCase[i].expected);
        });
    }
});

const testCase = [
    // {
    //     name: "Arithmetic",
    //     value: "3+4",
    //     expected: 7
    // }, {
    //     name: "Factorial",
    //     value: "6!",
    //     expected: 720
    // },
    // {
    //     name: "Multiple Factorials",
    //     value: "6!+8!+9!",
    //     expected: 403920
    // },
    // {
    //     name: "Percentage + Factorial",
    //     value: "6%!",
    //     expected: 1
    // },
    // {
    //     name: "Factorial + Percentage",
    //     value: "6!%",
    //     expected: 7.2
    // },
    // {
    //     name: "Factorial + Percentage + Arithmetic Assortment",
    //     value: "6!%*9+6/2",
    //     expected: 67.8
    // },
    // {
    //     name: "Factorial + Percentage + Arithmetic Assortment",
    //     value: "6!%*1+6/2",
    //     expected: 10.2
    // }
    // {
    //     name: "Simple Power",
    //     value: "4^4",
    //     expected: 256
    // },
    // {
    //     name: "Complex Power",
    //     value: "4.5^.2^.3^5.2",
    //     expected: 4.479273878
    // },
    // {
    //     name: "Factorial + Complex Power",
    //     value: "4!^.2^.3^5.2",
    //     expected: 23.767033491
    // },
    // {
    //     name: "Percentage + Complex Power",
    //     value: "4.5%^.2^.3^5.2",
    //     expected: 0.045430361
    // },
    // {
    //     name: "Percentage + Complex Power + Factorial",
    //     value: "4%^.2^.3^5!",
    //     expected: 0.04
    // },
    // {
    //     name: "Percentage + Complex Power",
    //     value: "4!^.2^.3^5.2%",
    //     expected: 2.015415043
    // },
];