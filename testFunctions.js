const storedFunction = [{
        "name": "percentage",
        "regex": /(\d+%)/g, //1) 
        "function": (match, p1) => {
            return p1.slice(0, p1.length - 1) / 100;
        }
    },
    {
        "name": "factorial",
        "regex": /(\d+!)/g,
        "function": (match, p1) => {
            return factorial(p1.slice(0, p1.length - 1));
        }
    },
    {
        "name": "log",
        "regex": /(log\()(\d+\.?\d+)(\))/g,
        "function": (match, p1, p2) => {
            return Math.log10(p2);
        }
    },
    {
        "name": "sine",
        "regex": /(sin\()(\d+\.?\d+)(\))/g,
        "function": (match, p1, p2) => {
            return Math.sin(p2);
        }
    }
];
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
const prioritise = (str) => {
    let i = 0;
    const prioritising = (str) => {
        if (storedFunction[i].regex.test(str)) {
            str = str.replace(storedFunction[i].regex, storedFunction[i].function);
            i++;
            return prioritising(str)
        }
        return str;
    }
    return prioritising(str);
}
let testCases = ["log(10%!)", "sin(log(10!%))"];
console.log(prioritise(testCases[0]));
// 
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