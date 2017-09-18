let str = "4.5^.2^.3^5.2"
exponentDetected = /([-+]?[0-9]*\.?[0-9]+)/g [Symbol.match](str);
for (let j = exponentDetected.length - 1; j > 0; j--) {
    let exp = /^([-+]?[0-9]*[\%])$/g.test(exponentDetected[j]) ? parseInt(exponentDetected[j]) :
        parseFloat(exponentDetected[j]);
    console.log(exp);
    let base = /^([-+]?[0-9]*[\%])$/g.test(exponentDetected[j - 1]) ? parseInt(exponentDetected[j - 1]) :
        parseFloat(exponentDetected[j - 1]);
    console.log(base);
    newStr = j == exponentDetected.length - 1 ? Math.pow(base, exp) : Math.pow(base, newStr);
    console.log(newStr);
    if (j > 1) {
        continue;
    }
    str = str.replace(/^([-+]?[0-9]*\.?[0-9][\^])+([-+]?[0-9]*\.?[0-9])+$/g, newStr);
}

// console.log(str);