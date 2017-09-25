const mocha = require('mocha');
const assert = require('chai').assert;

// test different string combinations and see whether the regex can match that correctly
const factorial = num => {
    if (typeof num !== "number" || isNaN(num)) {
        return NaN;
    }
    if (!(num % 1 === 0)) {
        return num;
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
// exports.plus = (a, b) => {
//     return a + b;
// }

const captureLoopedValues = (timesLoop, element) => {
    let filledArray = [];
    let i = 0;
    const loopedValues = () => {
        i++;
        filledArray.push(element)
        if (i === timesLoop) {
            console.log(filledArray);
            return undefined;
        }
        return loopedValues();
    }
}

function convertSymbol(str) {
    // return str;

    if (/(e)/g.test(str)) {
        str = /\be\b/g.test(str) ? str.replace(/(e)/g, Math.E) : str.replace(/(\d*?\.?\d*?)[e]/g, /(\d*?\.?\d*?)[e]/g.exec(str)[1] + "*" + Math.E);
    }
    if (/(π)/g.test(str)) {
        str = str.replace(/π/g, 'pi');
        str = /\bpi\b/g.test(str) ? str.replace(/(pi)/g, Math.PI) : str.replace(/(\d*?\.?\d*?)(pi)/g, /(\d*?\.?\d*?)(pi)/g.exec(str)[1] + "*" + Math.PI);
    }
    return str;
}

// Utilized another persons solution from StackOverFlow
// Profile: https://stackoverflow.com/users/1253087/lcoderre
// Solution: https://stackoverflow.com/questions/24085277/rounding-to-significant-figures-missing-zeros

function roundSF(significantFig) {
    // Match every "leading zeros" before and after the .

    if (this == Infinity || this == -Infinity) {
        return this;
    }
    // Numbers with digits 1e+20 & beyond are automatically converted to exponential numbers, via the eval function
    if (this >= 1e+20) {
        return eval(this);
    }
    // Decimal numbers that contain many zeros at the end of it
    if (/0/g.test(/(0*$)/ [Symbol.match](this.toString())[0])) {
        console.log("Array Length 0's : " + /0/g.test(/(0*$)/ [Symbol.match](this.toString())[0]));
        return this % 1 === 0 ? eval(this) : parseFloat(this.toString().replace(/(0)/, ""));
    }
    // Decimal numbers that contain many nines at the end of it

    if (/9/g.test(/(9*$)/ [Symbol.match](this.toString())[0])) {
        console.log("I should see this : " + this)
        if (/(9*$)/ [Symbol.match](this.toString())[0].length >= 3) {
            let strEndNine = this.toString();
            let num = strEndNine.match(/(\d9*)$/)[0][0];
            if (num === "9") {
                console.log("if")
                console.log(parseInt(strEndNine.split(".")[0]));
                return parseInt(strEndNine.split(".")[0]) + 1;

            } else {
                console.log("else");
                let index = strEndNine.indexOf(num);
                let numAtIndex = strEndNine[strEndNine.indexOf(num)];
                let indexNum = parseInt(num) + 1;
                let afterDecimal = strEndNine.slice(strEndNine.indexOf(".") + 1).replace(/(9*)$/, "")
                return strEndNine.slice(0, index) + strEndNine.slice(index, afterDecimal.length + 1) + indexNum;
            }
        } else {
            return this;
        }
    }

    var matches = this.toString().match(/^-?(0+)\.(0*)/);
    console.log(matches);
    // starting with "0."

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


    if (matches) {
        var firstIndex = matches[0].length;
        var prefix = matches[0];

        sf = Number(this.toString().substring(firstIndex, firstIndex + significantFig + 1));
        sf = Math.round(sf / 10);
        sf = prefix + sf.toString();
        // get rid of 0.9, 0.09, 0.009 etc rounding error

        negateRoundError = Number(sf).toFixed(matches[2].length + significantFig);
        console.log(matches.input);
        console.log(negateRoundError.toString());

        // if (matches.input >= .15 && matches.input < 0.2) {
        //     return matches.input;
        // }

        //return;
        // return negateRoundError / matches.input;
        console.log(negateRoundError, matches.input);
        return negateRoundError < matches.input ? Math.round10(matches.input, -12) : (negateRoundError / matches.input) >= (0.2 + Math.pow(1, -100)) / 0.15 ? negateRoundError : matches.input;
    }

    // starting with something else like -5.574487436097115
    else {
        matches = this.toString().match(/^(-?(\d+))\.(\d+)/);
        var decimalShift = significantFig - matches[2].length;
        var rounded = Math.round(this * Math.pow(10, decimalShift));
        rounded /= Math.pow(10, decimalShift);
        return rounded.toFixed(decimalShift);
    }
}
Number.prototype.roundSF = roundSF;

exports.regexTrain = function(string) {

    let total = "";
    let endRegex = "";
    let newStr = "";
    let i = 0;
    // there should be check here. As in are there any more bracketed values??
    let str = "";
    let bracketedValue = "";

    string = convertSymbol(string);
    do {
        // console.log(string);
        let functionUtilized = "";
        if (/(ln|log|sin|cos|tan)\([^()"]*(?:"[^"]*"[^()"]*)*\)/g.test(string)) {
            functionUtilized = /(ln|log|sin|cos|tan)\([^()"]*(?:"[^"]*"[^()"]*)*\)/g.exec(string)[1];
            bracketedValue = /(ln|log|sin|cos|tan)\([^()"]*(?:"[^"]*"[^()"]*)*\)/g.exec(string)[0];
            str = /\([^()"]*(?:"[^"]*"[^()"]*)*\)/g.exec(bracketedValue)[0]
            str = str.slice(1, str.length - 1);
        } else if (/\([^()"]*(?:"[^"]*"[^()"]*)*\)/g.test(string)) {
            bracketedValue = /\([^()"]*(?:"[^"]*"[^()"]*)*\)/g.exec(string)[0];
            str = bracketedValue.slice(1, bracketedValue.length - 1);
        } else {
            str = string;
        }
        // console.log(functionUtilized);
        // console.log(bracketedValue);
        // console.log(str);
        do {
            console.log("Init String : " + string);
            console.log("Init Str :" + str);
            i++;
            if (/([-+]?[0-9]*\.?[0-9]+[\!])/g.test(str)) {
                console.log("str : " + str)
                factorialDetected = /([-+]?[0-9]*\.?[0-9]+[\!])/g [Symbol.match](str);
                for (let j = 0; j < factorialDetected.length; j++) {
                    let value = /^([-+]?[0-9]*[\!])$/g.test(factorialDetected[j]) ? parseInt(/([-+]?[0-9]*[\!])/g.exec(factorialDetected[j])[0]) :
                        parseFloat(/([-+]?[0-9]*\.?[0-9]+[\!])/g.exec(factorialDetected[j])[0]);
                    // console.log(value);
                    newStr = factorial(value) + "";
                    console.log("newStr : " + newStr);
                    console.log("str after: " + str);
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
            if (/([-+]?[0-9]*\.?[0-9])+[\^]+([-+]?[0-9]*\.?[0-9])+/g.test(str)) {
                // potential solution, is where isolate the parts with power
                // then isolate the exponents and bases
                let exponentArr;
                let exponentStrDetected;
                // filters the powers strings from the non-power strings
                if (/^([-+]?[0-9]*\.?[0-9]*?[\^][\-+]?[0-9]*?\.?[0-9]*?)+$/.test(str)) {
                    exponentArr = [str];
                } else {
                    exponentStrDetected = /([^\+\-\*\/]\d*?\.?\d*?[^\+\-\*\/])+/g [Symbol.match](str)
                    exponentArr = exponentStrDetected.filter((x) => {
                        return /^([-+]?[0-9]*\.?[0-9]*?[\^])+([\-+]?[0-9]*?\.?[0-9]*?)+$/.test(x)
                    });
                }

                console.log("exponentStrDetected : " + exponentStrDetected);
                console.log("exponentArr : " + exponentArr);

                for (let j = 0; j < exponentArr.length; j++) {
                    exponentDetected = /([-+]?[0-9]*\.?[0-9]+)/g [Symbol.match](exponentArr[j]);
                    console.log("exponentDetected.length : " + exponentDetected.length);
                    for (let k = exponentDetected.length - 1; k > 0; k--) {
                        console.log("exponentDetected.length : " + exponentDetected.length);
                        let exp = /^([-+]?[0-9]*)$/g.test(exponentDetected[k]) ? parseInt(exponentDetected[k]) :
                            parseFloat(exponentDetected[k]);
                        console.log("exp : " + exp)
                        console.log("exponentDetected.length : " + exponentDetected.length);
                        let base = /^([-+]?[0-9]*)$/g.test(exponentDetected[k - 1]) ? parseInt(exponentDetected[k - 1]) :
                            parseFloat(exponentDetected[k - 1]);
                        testNum = exponentDetected.length;
                        testNum--;
                        console.log("base : " + base < 0)
                        if (base < 0) {
                            newStr = k === testNum ? -1 * Math.pow(Math.abs(base), exp) : -1 * Math.pow(Math.abs(base), newStr);
                        } else {
                            newStr = k === testNum ? Math.pow(Math.abs(base), exp) : Math.pow(Math.abs(base), newStr);
                        }

                        console.log("newStr : " + typeof newStr);
                        if (k > 1) {
                            continue;
                        }
                        console.log("newStr : " + newStr);
                        console.log("typeof newStr : " + typeof newStr);
                        if (1.628413597910451e-21 < 1e-7) {
                            console.log("weird case : " + true);
                        } else {
                            console.log("weird case : " + false)
                        }
                        console.log("newStr % 1 == 0 : " + newStr % 1 == 0);
                        console.log("str before:  " + str);
                        str = str.replace(exponentArr[j], newStr % 1 == 0 ? newStr : newStr < 1e-7 ? newStr : parseFloat(newStr).roundSF(12));
                        console.log("str after:  " + str);
                    }
                }
                continue;
            }
            // WARNING THIS HAS NO CONDITION - based on the assumption that it passes down the cascade 
            // Arithmetic operations -> /\(?([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)\)?/g
            // Floats + Ints -> /^\d+\.\d+$/
            console.log("Before it hits Eval: " + str);
            str = eval(str);
            console.log("functionUtilized: " + functionUtilized);
            console.log("Last Output: " + str);
            if (functionUtilized !== "") {
                let actualNum = /^([-+]?[0-9]*)$/g.test(str) ? parseInt(str) : parseFloat(str);
                switch (functionUtilized) {
                    case "ln":
                        str = Math.log(str) + "";
                        break;
                    case "log":
                        str = Math.log10(str) + "";
                        break;
                    case "sin":
                        str = actualNum < Math.pow(10, 16) ? Math.sin(str) + "" : "0"; // return 0 clones the behaviour of the google calculator
                        break;
                    case "cos":
                        str = actualNum < Math.pow(10, 16) ? Math.cos(str) + "" : "0";
                        break;
                    case "tan":
                        str = actualNum < Math.pow(10, 16) ? Math.tan(str) + "" : "0";
                        break;
                }
                functionUtilized = "";
                // console.log(str);
                str = str.replace(bracketedValue, str);
                continue;
            }
            break;
        }
        while (!/^([-+]?[0-9]*\.*[0-9]+?)$/.test(str) || i == 3 || functionUtilized !== "");
        console.log("This is the Str: " + str);
        string = bracketedValue == "" ? str :
            string.replace(bracketedValue, str) // just use this method for now and we can think of functions after
        bracketedValue = "";
        console.log("Outerloop string: " + string);
        if (/\([^()"]*(?:"[^"]*"[^()"]*)*\)/g.test(string) || /([!\^\%])/g.test(string)) {
            continue;
        } else {
            break;
        }
    } while (!/^([-+]?[0-9]*\.*[0-9]+?)$/.test(string) || i == 3);
    console.log("FINAL STRING : " + string);

    if (string == Infinity || string == -Infinity) {
        return string;
    }
    if (typeof string === "string") {
        string = eval(string);
        string = /(\.)/.test(string) ? parseFloat(string) : parseInt(string);
    }
    return string % 1 === 0 ? eval(string).toString() : string < 1e-7 ? string.toString() : eval(string.roundSF(12)).toString();
}



describe("REGEX STRING TESTS", function() {
    const testCase = [{
            name: "Arithmetic",
            value: "3+4",
            expected: 7
        },
        {
            name: "Arithmetic + Functions",
            value: "((3+4)+cos(5)+ln(e))",
            expected: 8.283662185
        },
        {
            name: "Arithmetic + Functions",
            value: "((3+4)+ln(e))",
            expected: 8
        },
        {
            name: "Arithmetic + Functions",
            value: "((3+4))",
            expected: 7
        },
        {
            name: "Arithmetic",
            value: "3+4",
            expected: 7
        },
        {
            name: "Parenthesise + Arithmetic",
            value: "(3+4)",
            expected: 7
        },
        {
            name: "Cosine",
            value: "cos(5)",
            expected: 0.283662185
        },
        {
            name: "ln",
            value: "ln(e)",
            expected: 1
        },
        {
            name: "Percentage + Factorial",
            value: "6%!",
            expected: 1
        },
        {
            name: "Factorial + Percentage",
            value: "6!%",
            expected: 7.2
        },
        {
            name: "Factorial + Percentage + Arithmetic Assortment",
            value: "6!%*9+6/2",
            expected: 67.8
        },
        {
            name: "Factorial + Percentage + Arithmetic Assortment",
            value: "6!%*1+6/2",
            expected: 10.2
        }, {
            name: "Simple Power",
            value: "4^4",
            expected: 256
        },
        {
            name: "Complex Power",
            value: "4.5^.2^.3^5.2",
            expected: 4.479273878
        },
        {
            name: "Factorial + Complex Power",
            value: "4!^.2^.3^5.2",
            expected: 23.767033491
        },
        {
            name: "Percentage + Complex Power",
            value: "4.5%^.2^.3^5.2",
            expected: 0.045430361
        },
        {
            name: "Percentage + Complex Power + Factorial",
            value: "4%^.2^.3^5!",
            expected: 0.04
        },
        {
            name: "Percentage + Complex Power",
            value: "4!^.2^.3^5.2%",
            expected: 2.015415043
        },
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