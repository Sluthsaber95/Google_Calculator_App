const convertTransdentalNum = (str) => {
    if (/(e)/g.test(str)) {
        return /^[e]$/g.test(str) ? Math.E : /(\d*?\.?\d*?)[e]/g.exec(str)[1] + "*" + Math.E;
    }
    if (/(π)/g.test(str)) {
        return /^[π]$/g.test(str) ? Math.PI : /(\d*?\.?\d*?)[π]/g.exec(str)[1] + "*" + Math.PI;
    }
}
String.prototype.convertTransdentalNum = convertTransdentalNum;
const string = "2e";
const pi = "2π";
const complexString = "((3+4)+cos(π)+ln(e))"
console.log(String.prototype.convertTransdentalNum(complexString));;

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