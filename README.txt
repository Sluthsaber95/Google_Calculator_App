Google Calculator Clone

//////////////////////
Meta:

Planning: When planning the logic and architecture of the application, keep decomposing each step, until you can break into a smaller pieces. Good questions to ask yourself.
What do you mean exactly by that?

Pain Points Description: X is Y, because of Z
X: Problem
Y: Description of pain
Z: Reason for Problem

Insight Points: X has been helpful, because it can Y
X: The topic being discussed
Y: Reasons for the topic being helpful


/////////////////////
Pain points: I am only 60 lines into my code, and it is getting more and more complicated to add extra functionality to my application

How to keep everything from being convoluted, with your inability to plan for the next fews step?

- Document the application

    - Discuss ways the javascript file should be written
     - Document each function used - this in itself makes you think
    - Think about ways to easily add additional features to the applications

////////////////////
Documentation

Reasons making this application:

A version of application already exists, so I have a form of a benchmark I can use to see how good my application is compared to an existing one. In this case it's the "Google Calculator Search Application"


Spec Sheet

Main Goal of application

Use Cases
As a user I can:
    - do basic arithmetic on the calculator, and it should be a numerical value
    - change radians to degree, vice versa, simply by clicking on the Rad/Deg toggle: 1 Radian -> 180/pi
    - change return the factorial of a number: 5! -> 120
    - use brackets to alter the precedence of the equation
    - convert percentage value to a numerical value: 150% -> 1.5
    - use the backspace key
        1) to delete the previous value, if I already entered that value; acts like CE on any other calculator: 123 -> 12, 4ln(5) -> 4ln(5
        2) to delete the entire value, after I have pressed the equals button; acts like the AC on any other calculator: 123 -> ""  , the "" depicts an empty string
    - use sine button to calculate the value of sin(x): Degrees is toggled on, sin(360) -> 0
    - use natural-log button to calcuate the value of ln(x): ln(e) -> 1;
    - use pi button to get the constant of pi: 3.14159
    - use cosine button to calculate the value of cos(x): Degress is toggled on, cos(360) -> 1
    - use logarithm button to calculate the value of log(x): log(10) -> 1;
    - use e button to get the constant of e: 2.718281
    - use tangent button to calculate the value of tan(x): tan(45) -> 1;
    - use square root to calculate the value of x^1/2: 4^1/2 -> 2;
    - use answer button to get the previous answer stated from before
    - use exponential button to raise the exponent of base 10 10^y: 10^3 -> 1000;
    - use power button to raise the exponent of any base x^y: 2^10 -> 1024;
    - utilize the equals button, to return an answer

Each use case is tested for
    - precedence


Now use cases will now be prioritised into groups


    1) Basic functionality
    -----------------------------------------------------------------------------
    - utilize the equals button, to return an answer
    - use answer button to get the previous answer stated from before   
    - use the backspace key
        a) to delete the previous value, if I already entered that value; acts like CE on any other calculator: 123 -> 12, 4ln(5) -> 4ln(5
        b) to delete the entire value, after I have pressed the equals button; acts like the AC on any other calculator: 123 -> ""  , the "" depicts an empty string
    - do basic arithmetic on the calculator, and it should be a numerical value
    - use brackets to alter the precedence of the equation

    2) Conversion and Basic Operation, and constants
    -----------------------------------------------------------------------------
    - convert radians to degree, vice versa, simply by clicking on the Rad/Deg toggle: 1 Radian -> 180/pi
    - change return the factorial of a number: 5! -> 120
    - convert percentage value to a numerical value: 150% -> 1.5
    - use e button to get the constant of e: 2.718281
    - use pi button to get the constant of pi: 3.14159

    3) Passing numerical values through more complicated functions
    -----------------------------------------------------------------------------
    - use sine button to calculate the value of sin(x): Degrees is toggled on, sin(360) -> 0
    - use natural-log button to calcuate the value of ln(x): ln(e) -> 1;
    - use cosine button to calculate the value of cos(x): Degress is toggled on, cos(360) -> 1
    - use logarithm button to calculate the value of log(x): log(10) -> 1;
    - use tangent button to calculate the value of tan(x): tan(45) -> 1;

    4) Power, exponents and square root
    -----------------------------------------------------------------------------
    - use square root to calculate the value of x^1/2: 4^1/2 -> 2;
    - use exponential button to raise the exponent of base 10 10^y: 10^3 -> 1000;
    - use power button to raise the exponent of any base x^y: 2^10 -> 1024;




-------------------------------------------------------------------------------------
Simple Plan
-------------------------------------------------------------------------------------
Remember:
Main Aim - is to replicate the entire calculator to the best of my ability

- Configure a html and css clone of the Google Calculator
- The order of precedence is seen as the biggest problem, the plan is do a few mathematical sum at the start, using a plethera of values from the buttons, to mix and match possible calculations
- Current logic architecture
    - Create a file system where you can;
        - a file individual functions that can calculate the value
        - a file to takes able to take into the value and process
    - How each value will be processed
        - Buttons assigned events
            - describes how each button transcribes and store values in state
                - [Any value/except equals, backspace, rad|deg, ans] button -> inputs a value into state that are recognisable by regex
                - [equal] button is pressed -> state is casted into a string, regex is used to recognise specific parts of the string; regex will be used over and over again.
                Where the highest order of precedence is detected by regex, and values converted to numerical values. -> this process occurs again, until every value is
                converted to a string that can be processed by eval
                - [backspace] button (below is copied and pasted from user stories, with some alterations)
                    a) to delete the previous value, if I already entered that value; acts like CE on any other calculator: 123 -> 12, 4ln(5) -> 4ln(5
                    b) to delete the entire value, after I have pressed the equals button; acts like the AC on any other calculator: 123 -> ""  , the "" depicts an empty string
                - [rad|deg]toggle -> detects the use of sin, cos, tan, the alters the values within it's brackets
                - [ans] button -> returns ans values on the screen and us -> places it back into state
            - how those values will recognised by regex. Make it easier in sense where, if additional functionality, i.e. buttons were added, then how will this button fit into the applications
        - Precedence of each function over another
        - The end string state, must be able to process by eval, to spit out an answer
- Enter tests for the entire calculator

Discoveries
- Whenever you input specific values, the value of precedent also depends on whether the value is left of the operator such as 5! or 5%

-------------------------------------------------------------------------------------
Improvements
-------------------------------------------------------------------------------------
Research what is already available out there, such native functions and objects of the language
File size vs File processing time

-------------------------------------------------------------------------------------
Doc Info - 09/09/2017 -  17:31
-------------------------------------------------------------------------------------
1) Need to test both floats and ints, as Regex will read them both differently
2) Need a way integrate random values into tests,
	i) Random floats
	ii) Random String values, where errors are expected to return
3) Should not focus on the inverse functions at the moment
4) Need to test out
    i) Constants will have it's own tests
    ii) Power Values have their own tests as well
-------------------------------------------------------------------------------------
Doc Info - 09/09/2017 -  17:10
-------------------------------------------------------------------------------------
If a value can't be evaluated by the 'eval' function return Error

-------------------------------------------------------------------------------------
Doc Info - 09/09/2017 -  14:39
-------------------------------------------------------------------------------------

Alter [Meta]:
Pain Points Description: X when I Y, as Z
X: Feelings
Y: Scenario
Z: Explanation

1) I'm annoyed with using babel, as I can't get it work without the use of webpack - just wondering if there is a way to transpile
to ES6 without the need of webpack or webstorm 

Insight Points: X has been helpful, because Y
X: Scenario/Topic
Y: Explanation

1) Mocha + Chai
{
	X: Using Mocha and Chai for building a test suite,
	Y: I can now build my own testing templates
}
1 a) 
{
	X: Using dynamically generated tests
	Y: Code base is more maintainable, easy-to-read and shorter - https://mochajs.org/#dynamically-generating-tests
}

1 b)
{
	X: xdescribe + describe.skio() allow for test pending, and describe.only(), only run required tests
	Y: Signal/Noise is increased
}
-------------------------------------------------------------------------------------
Doc Info - 09/09/2017 -  00:32
-------------------------------------------------------------------------------------
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
// 2) get rid of incrementer, place it within the function - stop it from polluting the global namespace

