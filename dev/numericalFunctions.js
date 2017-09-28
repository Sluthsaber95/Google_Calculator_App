// functions and constants that are not required??
// >> sin, cos, tan, log10, log1p (natural log), sqrt
// >> constants pi and e
// Casting function
const degreeToRad = (angle) => {
    return angle * (Math.PI / 180);
}
const radToDegree = (angle) => {
    return angle * (180 / Math.PI);
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
const factorial = (num) => {
    let val = 1;
    const calcFactorial = (num) => {
        if (num > 1) {
            val *= num;
            num--;
            return calcFactorial(num);
        }
        return val === 0 ? 1 : val;
    }
    return calcFactorial(num);
}
const prioritise = (str, propsName) => {
    let i = 0;
    const prioritising = (str, propsName) => {
        if (storedFunction[propsName[i]].regex.test(str)) {
            str = str.replace(storedFunction[propsName[i]].regex, storedFunction[propsName[i]].function);
            i === propsName.length - 1 ? i : i++;
            return prioritising(str, propsName)
        }
        return str;
    }
    return prioritising(str, propsName);
}
let testCases = ["log(10%!)", "sin(log(10!%))", "log(10%!) + sin(log(10!%))"];
console.log(prioritise(testCases[0], ["percentage", "factorial", "log", "sine"]));
// 09/09/2017 - 12:37
// what we can do is start by slowly replacing values in brackets first, "log(10%!) + sin(log(10!%))" -> "log(0.95135076986) + sin(log(36288))"
// Use bracket () detection, should always give brackets the highest priority -> apply to the 3 cases
// ["(10%!)", "(10!%)"] so for all 3 cases these values should be detected first
// 1) cases ["percentage", "factorial"];
// 2) cases ["factorial", "percentage"];


// 09/09/2017 - 00:37
// Documentation - every object is stored with a name, regex, function 
//-> all these represent the available buttons
// maybe a place in a more advance


// const degreeToRad = (angle) => {
//     return angle * (Math.PI / 180);
// }
// const radToDegree = (angle) => {
//     return angle * (180 / Math.PI);
// }

// 1) There is some concern with regex literal, need to be careful and place some conditional cases for (\d+\.?\d+), what if the value is just an integer