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
const percentage = (num) => {
    return num / 100;
}