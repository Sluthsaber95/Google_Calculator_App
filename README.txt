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
    - use natural-log button to calculate the value of ln(x): ln(e) -> 1;
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
    - use natural-log button to calculate the value of ln(x): ln(e) -> 1;
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
Sound/Noise
> REFACTOR - May consider creating a calculator object, reducing the code base further
> TESTING - 
    landing - Should test out nice mocha features "landing", test progress bar.
    dot - test you approximately where all the test are

-------------------------------------------------------------------------------------
Doc Info - 11/09/2017 - 12:44
-------------------------------------------------------------------------------------
Pain Points Description: X when I Y
It's starting to get annoying when you are testing things inside a file, as it gets really repetitive.
> I'd like to know if there is someway to reduce my S/N, by isolating a specific parts of my code.


It's tedious when I only scroll using up or down arrow keys. 
> I'd like to know if there is any quicker mouse-free method

Insight Points: X has been/could/would be more helpful, because/as Y
Learning how to utilize code snippets would be more helpful. 
> As I wouldn't have to rewrite what seems to be boilerplate code over and over again, this includes 
code templates as well

Creating my own personal library could be very helpful.
> As it would be less work on my behalf, this includes functions, my personal style of creating objects, 



TESTS

N.B: Without the use of tests, I wouldn't have been able to discover cases, that wouldn't have tested for

> Issue 1)

Random Tests require a expected value.

> Issue 2)
Need to test for duplicate groups, from the same testable groups. 

For instance "+ +", which should cause an error as there is no operand

> Issue 3) 
Some testable groups will cause an error if they placed to the right within the test case

For instance  "!sin(90)" which will cause an error, as eval cannot process "!1";

We do need conditions for all test cases.

Luckily, we have already narrowed all features down to 4 testable groups.

> Issue 4) how can you return that the value that I would have expected

So starting with 

    1) Factor - Factorial + Percentages - whether a factorial/percentage is used, a test can be used to test for both.
    2) Func - Functions - sine, cosine, tangent, natural-log or log
    3) Power - Power functions
    4) Arith - Arithmetic operators

    The best approach I decided on was to see if it was actually possible to create several test cases below, from the set tests.
    That could be created via the random tests.

    I'll start small with just groups 1) + 2)

    1) log(10!) => 6.5598
    2) log(1000)! => 6
    3) 500%! => 120
    4) sin(cos(0)) => 0.8415
    5) sin(90)% => 0.01

    Again, precedence is important here.

------------------
11/09/2017 - 15:12
------------------

TEST

1) Major success with creating singular test groups with test groups "Factor" + "Func", next step is to includes, testing 
permutations of every group. Starting with the ones below.

"Factor" + "Power"
"Factor" + "Arith"

The main aim here is to gain some insight in how I can write the right code for both "Power" and "Arith";

2) Another thing is that a lot of the code required to run test cases is repetitive. Thus should be refactor at the end
of creating this singular testing group


------------------
11/09/2017 - 16:04
------------------

TEST

1) another


-------------------------------------------------------------------------------------
Doc Info - 10/09/2017 - 22:25 -> 10/09/2017 - 23:41
-------------------------------------------------------------------------------------
Insight Points: X has been helpful, because Y
> Google Keep has been helpful, because it has enabled me to keep a checklist of all the tests that I need to written


When it comes to writting tests, I've already started with 3 tests.
BASIC ARITHMETIC TESTS 
INDIVIDUAL FUNCTIONS TESTS - includes percentage and factorial testing
POWER INDEX TESTS

The next tests will account for permutation of features that will be together - combinatorics.
After looking at the list of features. Please see below;

        1)  factorial
        2)  percentage
        3)  sine
        4)  cosine
        5)  tangent
        6)  π
        7)  e 
        8)  log
        9)  natural-log
        10) power functions (x^y, 10^x, x^0.5)
        11) arithmetic (+ - * /)

We can narrow them down to testable groups. In the order of precedence really

        1) Factorial + Percentages - whether a factorial/percentage is used, a test can be used to test for both.
        2) Functions - sine, cosine, tangent, natural-log or log
        3) Power functions
        4) Arithmetic operators
        *5) Brackets - need to know how bracket can play into this. We are always going place brackets in 
        *6) π and e - I am ruling these out, as they are precedence independent

        Therefore in total, there are 4 testable groups

Permutation formula is ironically depicted below - had to use the Google calculator for these.

X P Y { X ∈ N | Y ∈ N | X ≥ Y } =>  X! / (X - Y)! 

The combination test below, only test for a singular testable group, meaning no arithmetic operator is appended to 
this singular group

For instance from the examples last time

        "log(sin(6!% * 12.5) + 9)" and  "e ^ π" are two singular groups

        Whereas;

        "log(sin(6!% * 12.5) + 9) / (e ^ π)" is not a singular group, as they are both linked with an "+" operator

Another addition is that as we are organising all of the features into testable groups, we can introduce randomised testing.

For example the random operation would consist of choosing a function, from function testable groups.

const functionGroup = ["sine", "cosine", "tangent", "natural-log", "log"];


All these tests below are semi-random, meaning that they initially have fixed test schemes, however the a majority of them
consist of random tests. The number displayed below each test, is the tests are full written out.

SINGULAR GROUPS - 2 FEATURE COMBINATION TESTS 
4C2 = 12
SINGULAR GROUPS - 3 FEATURE COMBINATION TESTS 
4C3 = 4
DOUBLE GROUPS - 2 FEATURE COMBINATION TESTS 
12
DOUBLE GROUPS - 3 FEATURE COMBINATION TESTS 
4

In this case 32 test are all written out. With each test have 1 or more random tests attached.
So the minimum of tests would be 32 + 4 =  36 minimum test cases.

I am highly satisfied with this approach, as it can be used to easily test new functionality, when the occasion comes.


-------------------------------------------------------------------------------------
Doc Info - 09/09/2017 -  18:31 ->  10/09/2017 - 22:24
-------------------------------------------------------------------------------------
Pain Points Description: X when I Y, as Z
1) It's feel pretty tiring when writing tests, as the process is very repetitive.

    i) Another thing I have noticed is how demotivated I feel. A way to tackle this is
    figure out what different cases you need. 

    It initially boiled down to understanding first principle mathematics, so priority was a major concern.
    As it would effect when each feature, which treated as a unique operand, was fired.
    Another thing to pertain towards, was what condition requires each feature to fire, as users will not 
    always use every single feature, per calculation.

    From this we can simply conclude, 2 things to keep account of:

    1) When should a feature fire?
    2) What condition must be met for the feature to fire? Luckily as maths is a step by step process, it is
    easy to understand, how each calculation is made independent of another.

    So, the list of features includes.

        1)  factorial
        2)  percentage
        3)  sine
        4)  cosine
        5)  tangent
        6)  π
        7)  e 
        8)  log
        9)  natural-log
        10) power functions (x^y, 10^x, x^0.5)
        11) arithmetic (+ - * /)

    Looking at this list we can then prioritise what to calculate first from the string that is passed
        
    We can look all the functions that do not require brackets. Actually brackets affect the order of precedence
    so we can going to exclude altogether.

    These constants will transformed first as they are quoted as precedence independent

            - constants -> π, e

        1)  factorial
        2)  percentage
        3)  sine
        4)  cosine
        5)  tangent
        6)  log
        7)  natural-log
        8)  power functions (x^y, 10^x, x^0.5)
        9) arithmetic (+ - * /)

    Factorials and percentages should only fire when there is a numerical value to the left of it
    Power Functions are similar to factorials and percentages, however they fire when there are only numerical

        1)  sine
        2)  cosine
        3)  tangent
        4)  log
        5)  natural-log
        6)  arithmetic (+ - * /)

    These calculation are performed last within any brackets
    - arithmetic values -> + - * /

    Lastly, as functions usually encapsulate a value in brackets, it should be the last step. 
    From conversion of f(x) -> y where f(x) is the function and value and y is the end value.

    This entire process can now be repeated over and over, until the entire string is narrowed down and returns a single
    string value, which would either represent a int or string.

        Example:

        "log(sin(6!% * 12.5) + 9) / (e ^ π)"

        It may look complicated right now but with the use of each step it can be easily broken down

        1) Constants
        
            log(sin(6!% * 12.5) + 9) / (e ^ π)  
            
            Becomes:

            log(sin(6!% * 12.5) + 9) / (2.7183 ^ 3.1416)

        N.B: Remember constants are independent of priority

        2) Focusing inside brackets -> Factorials + Percentages

            log(sin(6!% * 12.5) + 9) / (2.7183 ^ 3.1416)

        Next what we target is the most inner bracket first, ones that do not contain another other function 
        inside it.
        Instead, it should contain only these symbols used (! % + - * /) and numbers both ints and floats.

            log(sin(6!% * 12.5) + 9) / (2.7183 ^ 3.1416)

            Becomes:

            log(sin(7.2 * 12.5) + 9) / (2.7183 ^ 3.1416)
        

        The step after this is to complete any possible index calculations

            log(sin(7.2 * 12.5) + 9) / 23.1406
        
        As arithmetic operators are considered last, we can now evaluate the first set of brackets.

            Becomes:

            log(sin(90) + 9) / 23.1406

        After sub-strings in the first set of brackets have been reduced down to a value. The function can then fire.

            log(1 + 9) / 23.1406

        And the entire process repeats again..

            1 / 23.1406 -> 0.0432

        This end value, then gets stored in Ans. Via this part of the event model

        equal button pressed => Value gets calculated => any other button pressed stores value into "Ans" 

Additional feature noticed:

At the Beginning) Before any thing is pressed or calculated. The Google Calculator defaults to "0" as an initial value.


Insight Points: X has been/could be more helpful, because Y
1) With additional complexity, React would really come in handy here, because it splits up all the buttons
In individual sizeable chunks, every button can have it's own unique action

-------------------------------------------------------------------------------------
Doc Info - 09/09/2017 -  17:31
-------------------------------------------------------------------------------------
Tests

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

1) I'm annoyed when I am using babel, as I can't get it work without the use of webpack - just wondering if there is a way to transpile
to ES6 without the need of webpack or webstorm 

Insight Points: X has been/could be more helpful, because Y
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

