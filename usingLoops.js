// function convertSymbol() {
//     return this
//         .replace(/(\d*?\.?\d*?)(e)/g, (match, p1, p2) => {
//             return p1 == '' ? Math.E : p1 + '*' + Math.E;
//         })
//         .replace(/(\d*?\.?\d*?)(π)/g, (match, p1, p2) => {
//             return p1 == '' ? Math.PI : p1 + '*' + Math.PI;
//         });
// }
// String.prototype.convertSymbol = convertSymbol;

// String.prototype.returnThis = returnThis;
const string = "2e";
const pi = "2π";
// const complexString = "((3+4)+cos(2π)+ln(2e))";
const dualComplexString = "2e+e-3e*5π";
console.log(dualComplexString.convertTransdentalNum());;
// console.log(complexString.returnThis("cos"));
//regexp[Symbol.match](str)

// let str = "4.5^.2^.3^5.2"
// exponentDetected = /([-+]?[0-9]*\.?[0-9]+)/g [Symbol.match](str);
// for (let j = exponentDetected.length - 1; j > 0; j--) {
//     let exp = /^([-+]?[0-9]*[\%])$/g.test(exponentDetected[j]) ? parseInt(exponentDetected[j]) :
//         parseFloat(exponentDetected[j]);
//     console.log(exp);
//     let base = /^([-+]?[0-9]*[\%])$/g.test(exponentDetected[j - 1]) ? parseInt(exponentDetected[j - 1]) :
//         parseFloat(exponentDetected[j - 1]);
//     console.log(base);
//     newStr = j == exponentDetected.length - 1 ? Math.pow(base, exp) : Math.pow(base, newStr);
//     console.log(newStr);
//     if (j > 1) {
//         continue;
//     }
//     str = str.replace(/^([-+]?[0-9]*\.?[0-9][\^])+([-+]?[0-9]*\.?[0-9])+$/g, newStr);
// }

// console.log(str);