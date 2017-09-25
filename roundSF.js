const mocha = require('mocha');
const assert = require('chai').assert;

// Utilized another persons solution from StackOverFlow
// Profile: https://stackoverflow.com/users/1253087/lcoderre
// Solution: https://stackoverflow.com/questions/24085277/rounding-to-significant-figures-missing-zeros

// Needed to utilize another solution, for the .9 error
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

function roundSF(significantFig) {
    console.log("0 detection : " + /0/g.test(/(0*$)/ [Symbol.match](this.toString())[0]));
    console.log("9 detection : " + this.toString());
    // Match every "leading zeros" before and after the .

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

describe("Testing Out this significant figure function", function() {
    // remove true,false toggle for production code
    const testCases = [{
            name: "12 s.f [float]",
            num: 6.62671774925,
            sigFig: 12,
            expected: 6.62671774925
        }, {
            name: "11 s.f [float]",
            num: 6.62671774925,
            sigFig: 11,
            expected: 6.6267177493
        }, {
            name: "10 s.f [float]",
            num: 6.62671774925,
            sigFig: 10,
            expected: 6.626717749
        }, {
            name: "9 s.f [float]",
            num: 6.62671774925,
            sigFig: 9,
            expected: 6.62671775
        }, {
            name: "8 s.f [float]",
            num: 6.62671774925,
            sigFig: 8,
            expected: 6.6267177
        }, {
            name: "7 s.f [float]",
            num: 6.62671774925,
            sigFig: 7,
            expected: 6.626718
        }, {
            name: "6 s.f [float]",
            num: 6.62671774925,
            sigFig: 6,
            expected: 6.62672
        }, {
            name: "5 s.f [float]",
            num: 6.62671774925,
            sigFig: 5,
            expected: 6.6267
        }, {
            name: "4 s.f [float]",
            num: 6.62671774925,
            sigFig: 4,
            expected: 6.627
        }, {
            name: "3 s.f [float]",
            num: 6.62671774925,
            sigFig: 3,
            expected: 6.63
        }, {
            name: "2 s.f [float]",
            num: 6.62671774925,
            sigFig: 2,
            expected: 6.6
        }, {
            name: "1 s.f [float]",
            num: 6.62671774925,
            sigFig: 1,
            expected: 7
        }, {
            name: "12 0.599... s.f [float]",
            num: 0.5999999999999999,
            sigFig: 12,
            expected: 0.6
        }, {
            name: "12 0.999... s.f [float]",
            num: 0.9999999999999999,
            sigFig: 12,
            expected: 1
        },
        {
            name: "16 0.999... s.f [float]",
            num: 0.9999999999999991,
            sigFig: 16,
            expected: 1
        }, {
            name: "12 0.9 s.f [float]",
            num: 0.9,
            sigFig: 12,
            expected: 0.9
        }, {
            name: "12 0.0999 s.f [float]",
            num: 0.0999,
            sigFig: 12,
            expected: 0.1
        }, {
            name: "12 0.999... s.f [float]",
            num: 0.8999999999999991,
            sigFig: 12,
            expected: 0.8999999999999991
        },
        {
            name: "0.14 12 s.f [float]",
            num: 0.14,
            sigFig: 12,
            expected: 0.14
        },
        {
            name: "0.15 12 s.f [float]",
            num: 0.15,
            sigFig: 12,
            expected: 0.15
        }, {
            name: "0.16 12 s.f [float]",
            num: 0.16,
            sigFig: 12,
            expected: 0.16
        },
        {
            name: "0.17 12 s.f [float]",
            num: 0.17,
            sigFig: 12,
            expected: 0.17
        },
        {
            name: "0.19 12 s.f [float]",
            num: 0.19,
            sigFig: 12,
            expected: 0.19
        },
        {
            name: "0.105 12 s.f [float]",
            num: 0.105,
            sigFig: 12,
            expected: 0.105
        }, {
            name: "0.105 12 s.f [float]",
            num: 0.205,
            sigFig: 12,
            expected: 0.205
        }, {
            name: "0.1005 12 s.f [float]",
            num: 0.1005,
            sigFig: 12,
            expected: 0.1005
        }, {
            name: "0.104 12 s.f [float]",
            num: 0.104,
            sigFig: 12,
            expected: 0.104
        },
    ];
    const tests = 10;
    for (let i = 0; i < testCases.length; i++) {
        it(testCases[i].name, function() {
            assert.equal(testCases[i].num.roundSF(testCases[i].sigFig), testCases[i].expected);
        });
    }
    const testCase = [{
            name: "0.99999999999999", //14
            value: 0.99999999999999,
            expected: 1
        }, {
            name: "0.9999999999999", //13
            value: 0.9999999999999,
            expected: 1
        }, {
            name: "0.999999999999", //12
            value: 0.999999999999,
            expected: 1
        }, {
            name: "0.99999999999", //11
            value: 0.99999999999,
            expected: 1
        }, {
            name: "0.9999999999", //10
            value: 0.9999999999,
            expected: 1
        }, {
            name: "0.999999999", //9
            value: 0.999999999,
            expected: 1
        }, {
            name: "0.99999999", //8
            value: 0.99999999,
            expected: 1
        }, {
            name: "0.99999", //5
            value: 0.99999,
            expected: 1
        },
        {
            name: "2.99999", //5
            value: 2.99999,
            expected: 3
        },
        {
            name: "20.99999", //5
            value: 20.99999,
            expected: 21
        }, {
            name: "20009.99999", //5
            value: 20009.99999,
            expected: 20010
        },
        {
            name: "20.99000000000", //5
            value: 20.99,
            expected: 20.99
        },
        {
            name: "20000", //5
            value: 200000,
            expected: 200000
        }, {
            name: "2000000", //5
            value: 2000000,
            expected: 2000000
        },
        {
            name: "2000000000000000000000", //5
            value: 2000000000000000000000,
            expected: 2e+21
        },
    ];

    for (let i = 0; i < testCase.length; i++) {
        it(testCase[i].name, function() {
            assert.equal(testCase[i].value.roundSF(), testCase[i].expected);
        });
    }
});