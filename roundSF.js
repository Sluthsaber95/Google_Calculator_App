const mocha = require('mocha');
const assert = require('chai').assert;

// Utilized another persons solution from StackOverFlow
// Profile: https://stackoverflow.com/users/1253087/lcoderre
// Solution: https://stackoverflow.com/questions/24085277/rounding-to-significant-figures-missing-zeros

// Needed to utilize another solution, for the .9 error
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

function roundSF(significantFig) {
    // Match every "leading zeros" before and after the .
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
        return negateRoundError > matches.input ? Number(sf).toFixed(matches[2].length + significantFig) : Math.round10(matches.input, -2);
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
            expected: 0.9
        },
    ];
    const tests = 10;
    for (let i = 0; i < testCases.length; i++) {
        it(testCases[i].name, function() {
            assert.equal(testCases[i].num.roundSF(testCases[i].sigFig), testCases[i].expected);
        });
    }
});