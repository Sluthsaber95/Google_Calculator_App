function convertTransdentalNum(str) {
    // return str;

    if (/(e)/g.test(str)) {
        str = /\be\b/g.test(str) ? str.replace(/(e)/g, Math.E) : str.replace(/(\d*?\.?\d*?)[e]/g, /(\d*?\.?\d*?)[e]/g.exec(str)[1] + "*" + Math.E);
    }
    if (/(π)/g.test(str)) {
        str = str.replace(/π/g, 'pi');
        console.log(str);
        console.log(/(\d*?\.?\d*?)[pi]/g);
        str = /\bpi\b/g.test(str) ? str.replace(/(pi)/g, Math.PI) : str.replace(/(\d*?\.?\d*?)(pi)/g, /(\d*?\.?\d*?)(pi)/g.exec(str)[1] + "*" + Math.PI);
    }
    return str;
}
String.prototype.convertTransdentalNum = convertTransdentalNum;
const string = "e";
const pi = "π";
const complexString = "((3+4)+cos(2π)+ln(2e))"
const complexString2 = "((3+4)+cos(2+2π)+ln(2e/2))"
console.log(convertTransdentalNum(pi));;
console.log(convertTransdentalNum(string));;
console.log(convertTransdentalNum(complexString));
console.log(convertTransdentalNum(complexString2));

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