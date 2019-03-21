const calculator = document.getElementById("calculator");
const equal = document.getElementById("equal");
const buttonArea = document.getElementById("button-area");
const screen = document.getElementById("screen");
let state = [];
let answer = 0;

//radians and degrees are special state alterations

// floating point factorials require me to understand grammar functions
// at this current point in time, I do not know how to map out this type of function

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

function roundSF(num, significantFig) {
    let numToStr = num + "";

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

    if (num == Infinity || num == -Infinity) {
        return num;
    }
    // Numbers with digits 1e+20 & beyond are automatically converted to exponential numbers, via the eval function
    if (num >= 1e+20) {
        return eval(num);
    }
    // Decimal numbers that contain many zeros at the end of it
    if (/0/g.test(/(0*$)/ [Symbol.match](numToStr)[0])) {

        return num % 1 === 0 ? eval(num) : parseFloat(numToStr.replace(/(0)/, ""));
    }
    // Decimal numbers that contain many nines at the end of it

    if (/9/g.test(/(9*$)/ [Symbol.match](numToStr)[0])) {

        if (/(9*$)/ [Symbol.match](numToStr)[0].length >= 3) {
            let strEndNine = numToStr;
            let num = strEndNine.match(/(\d9*)$/)[0][0];
            if (num === "9") {
                return parseInt(strEndNine.split(".")[0]) + 1;

            } else {

                let index = strEndNine.indexOf(num);
                let numAtIndex = strEndNine[strEndNine.indexOf(num)];
                let indexNum = parseInt(num) + 1;
                let afterDecimal = strEndNine.slice(strEndNine.indexOf(".") + 1).replace(/(9*)$/, "")
                return strEndNine.slice(0, index) + strEndNine.slice(index, afterDecimal.length + 1) + indexNum;
            }
        } else {
            return num;
        }
    }
    let matches = numToStr.match(/^-?(0+)\.(0*)/);


    // starting with "0."
    if (matches) {
        let firstIndex = matches[0].length;
        let prefix = matches[0];

        sf = Number(numToStr.substring(firstIndex, firstIndex + significantFig + 1));
        sf = Math.round(sf / 10);
        sf = prefix + sf.toString();
        // get rid of 0.9, 0.09, 0.009 etc rounding error
        negateRoundError = Number(sf).toFixed(matches[2].length + significantFig);
        return negateRoundError < matches.input ? Math.round10(matches.input, -12) : (negateRoundError / matches.input) >= (0.2 + Math.pow(1, -100)) / 0.15 ? negateRoundError : matches.input;
    }

    // starting with something else like -5.574487436097115
    else {
        matches = numToStr.match(/^(-?(\d+))\.(\d+)/);

        // remove this code whenever possible
        if (matches === null) {
            return 0;
        }
        let decimalShift = significantFig - matches[2].length;
        let rounded = Math.round(num * Math.pow(10, decimalShift));
        rounded /= Math.pow(10, decimalShift);
        return rounded.toFixed(decimalShift);
    }
}

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

const calculate = (string) => {

    let total = "";
    let endRegex = "";
    let newStr = "";
    let i = 0;
    // there should be check here. As in are there any more bracketed values??
    let str = "";
    let bracketedValue = "";

    string = convertSymbol(string);
    // START review here
    do {
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
        do {
            i++;
            if (/([-+]?[0-9]*\.?[0-9]+[\!])/g.test(str)) {
                factorialDetected = /([-+]?[0-9]*\.?[0-9]+[\!])/g [Symbol.match](str);
                for (let j = 0; j < factorialDetected.length; j++) {
                    let value = /^([-+]?[0-9]*[\!])$/g.test(factorialDetected[j]) ? parseInt(/([-+]?[0-9]*[\!])/g.exec(factorialDetected[j])[0]) :
                        parseFloat(/([-+]?[0-9]*\.?[0-9]+[\!])/g.exec(factorialDetected[j])[0]);
                    newStr = factorial(value) + "";
                    str = str.replace(/([0-9]*\.?[0-9]+[\!])/, newStr);

                }
                continue;
            }
            if (storedFunction.percentage.regex.test(str)) {
                percentageDetected = /([-+]?[0-9]*\.?[0-9]+[\%])/g [Symbol.match](str);
                for (let j = 0; j < percentageDetected.length; j++) {
                    let value = /^([-+]?[0-9]*[\%])$/g.test(str) ? parseInt(/([-+]?[0-9]*[\%])/g.exec(str)[0]) :
                        parseFloat(/([-+]?[0-9]*\.?[0-9]+[\%])/g.exec(str)[0]);
                    newStr = value / 100 + "";
                    str = str.replace(/([-+]?[0-9]*\.?[0-9]+[\%])/g, newStr);

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


                for (let j = 0; j < exponentArr.length; j++) {
                    exponentDetected = /([-+]?[0-9]*\.?[0-9]+)/g [Symbol.match](exponentArr[j]);
                    for (let k = exponentDetected.length - 1; k > 0; k--) {
                        let exp = /^([-+]?[0-9]*)$/g.test(exponentDetected[k]) ? parseInt(exponentDetected[k]) :
                            parseFloat(exponentDetected[k]);
                        let base = /^([-+]?[0-9]*)$/g.test(exponentDetected[k - 1]) ? parseInt(exponentDetected[k - 1]) :
                            parseFloat(exponentDetected[k - 1]);
                        testNum = exponentDetected.length;
                        testNum--;
                        if (base < 0) {
                            newStr = k === testNum ? -1 * Math.pow(Math.abs(base), exp) : -1 * Math.pow(Math.abs(base), newStr);
                        } else {
                            newStr = k === testNum ? Math.pow(Math.abs(base), exp) : Math.pow(Math.abs(base), newStr);
                        }

                        if (k > 1) {
                            continue;
                        }
                        if (1.628413597910451e-21 < 1e-7) {} else {}
                        str = str.replace(exponentArr[j], newStr % 1 == 0 ? newStr : newStr < 1e-7 ? newStr : roundSF(parseFloat(newStr), 12));
                    }
                }
                continue;
            }
            // WARNING THIS HAS NO CONDITION - based on the assumption that it passes down the cascade 
            // Arithmetic operations -> /\(?([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)\)?/g
            // Floats + Ints -> /^\d+\.\d+$/
            str = eval(str);
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
                str = str.replace(bracketedValue, str);
                continue;
            }
            break;
        }
        while (!/^([-+]?[0-9]*\.*[0-9]+?)$/.test(str) || i == 3 || functionUtilized !== "");
        string = bracketedValue == "" ? str :
            string.replace(bracketedValue, str) // just use this method for now and we can think of functions after
        bracketedValue = "";
        if (/\([^()"]*(?:"[^"]*"[^()"]*)*\)/g.test(string) || /([!\^\%])/g.test(string)) {
            continue;
        } else {
            break;
        }
    } while (!/^([-+]?[0-9]*\.*[0-9]+?)$/.test(string) || i == 3);
    // End review here
    if (string == Infinity || string == -Infinity) {
        return string;
    }
    if (typeof string === "string") {
        string = eval(string);
        string = /(\.)/.test(string) ? parseFloat(string) : parseInt(string);
    }
    return string % 1 === 0 ? eval(string).toString() : string < 1e-7 ? string.toString() : roundSF(eval(string), 12).toString();
}


const buttonPressed = (element) => {
    if (element.target.tagName === "BUTTON") {
        if (element.target.className === "btn btn-number") {
            state.push(element.target.innerHTML);
        }

        switch (element.target.id) {
            case "pi":
                state.push("π");
                break;
            case "e":
                state.push("e");
                break;
            case "divide":
                state.push("/");
                break;
            case "multiply":
                state.push("*");
                break;
            case "subtract":
                state.push("-");
                break;
            case "add":
                state.push("+");
                break;
            case "left-bracket":
                state.push("(");
                break;
            case "right-bracket":
                state.push(")");
                break;
            case "factorial":
                state.push("!");
                break;
            case "percentage":
                state.push("%");
                break;
            case "power":
                state.push("^");
                break;
            case "square-root":
                state.push("^0.5");
                break;
            case "exponential":
                state.push("^10");
                break;
            case "log":
                state.push("log(");
                break;
            case "ln":
                state.push("ln(");
                break;
            case "sin":
                state.push("sin(");
                break;
            case "cos":
                state.push("cos(");
                break;
            case "tan":
                state.push("tan(");
                break;
            case "backspace":
                state.pop();
                break;
        }
        return state;
    }
}

// need a function that labels what to prioritise first


buttonArea.addEventListener('click', (e) => {
    buttonPressed(e);
    switch (e.target.id) {
        case "answer-btn":
            screen.innerHTML = ["Ans"];
            state.push(answer);
            console.log("should see this message");
            break;
        case "equal":
            screen.innerHTML = calculate(state.join("")).toString();
            answer = calculate(state.join("")).toString();
            state = [];
            break;
        default:
            screen.innerHTML = state.join("");
            break;
    }
});



// special functions

//join the string
// use a for loop to organise and set the order of precedence

//prefer the logic which requires you to search the digits, then anything after is the next order of precedence
//however some special function when next to another value are usually accounted as multiplication such 5ln(2) -> 5 * ln(2)