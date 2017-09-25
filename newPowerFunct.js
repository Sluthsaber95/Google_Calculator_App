const mocha = require('mocha');
const assert = require('chai').assert

function roundSF(significantFig) {
    // Match every "leading zeros" before and after the .
    if (this == Infinity || this == -Infinity) {
        return this;
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

const powerFunc = (str) => {
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

                console.log("newStr : " + newStr);
                if (k > 1) {
                    continue;
                }
                // console.log();
                str = str.replace(exponentArr[j], newStr % 1 == 0 ? newStr : parseFloat(newStr).roundSF(12));
            }
        }
        return str;
    }
}
console.log(powerFunc('5.6+3.3^2.5^1.7/7.8^4.5/6.7-9.8'));

describe("BASIC TESTS", function() {
    it("5.6+3.3^2.5^1.7/7.8^4.5/6.7-9.8", function() {
        assert.equal(powerFunc("5.6+3.3^2.5^1.7/7.8^4.5/6.7-9.8"), "5.6+289.622447857/10337.7425444/6.7-9.8")
    });
    it("2^3", function() {
        assert.equal(powerFunc("2^3"), "8")
    });
    it("3.3^2.5^1.7/6.7-9.8", function() {
        assert.equal(powerFunc("3.3^2.5^1.7/6.7-9.8"), "289.622447857/6.7-9.8")
    });
    it("-2^-3", function() {
        assert.equal(powerFunc("-2^-3"), "-0.125")
    });
    it("-2.5^-3.6", function() {
        assert.equal(powerFunc("-2.5^-3.6"), "-0.036933117591")
    });
    it("-2.5^-3.6-2.4", function() {
        assert.equal(powerFunc("-2.5^-3.6^-2.4"), "-0.958529198614")
    });
    it("10^1-5", function() {
        assert.equal(powerFunc("10^1-5"), "5")
    });
    it("10^2-5", function() {
        assert.equal(powerFunc("10^2-5"), "95")
    });
    it("10^1+5", function() {
        assert.equal(powerFunc("10^1+5"), "15")
    });
    it("10^2+5", function() {
        assert.equal(powerFunc("10^2+5"), "105")
    });
});
// need to test "-4.3^-7.1"
//Tried doing a full test, and problem was that it continuously looped for one of the test