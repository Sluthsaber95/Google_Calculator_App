const calculator = document.getElementById("calculator");
const equal = document.getElementById("equal");
let state = [];

//radians and degrees are special state alterations

// floating point factorials require me to understand grammar functions
// at this current point in time, I do not know how to map out this type of function


const buttonPressed = element => {
    if (element.target.tagName === "BUTTON") {
        if (element.target.className === "btn btn-number") {
            state.push(element.target.innerHTML);
        }
        switch (element.target.id) {
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
            case "log":
                state.push("log(");
                break;
        }
    }
};

// need a function that labels what to prioritise first


const convertFunction = (match, p1, p2) => {
    //convert special function into numerical values

    return factorial(parseInt(p1.replace("!", ""))).toString(); //factorial conversion
};

const calculateCurrentState = () => {
    let regex = /(\d!)(\d%)/g;
    console.log(state.join(""));
    console.log(eval(state.join("").replace(regex, convertFunction)));
};
calculator.addEventListener("click", buttonPressed);
equal.onclick = calculateCurrentState;

// special functions

//join the string
// use a for loop to organise and set the order of precedence

//prefer the logic which requires you to search the digits, then anything after is the next order of precedence
//however some special function when next to another value are usually accounted as multiplication such 5ln(2) -> 5 * ln(2)