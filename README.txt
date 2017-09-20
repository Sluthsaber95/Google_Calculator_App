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
Doc Info - 19/09/2017 - 10:28
-------------------------------------------------------------------------------------

-----------------------------
Doc Info - 19/09/2017 - 1 
-----------------------------
TESTS + APP DEVELOPMENT


-----------------------------
Doc Info - 19/09/2017 - 16:14 
-----------------------------

TESTS + APP DEVELOPMENT
Build your first successful prototype function
"((3+4)+cos(π)+ln(e))" => "((3+4)+cos(3.141592653589793)+ln(2.718281828459045))"
-----------------------------
Doc Info - 19/09/2017 - 15:18 
-----------------------------
TESTS + APP DEVELOPMENT
There is still the `ReferenceError: Invalid left-hand side expression in postfix operation`

-----------------------------
Doc Info - 19/09/2017 - 13:15 
-----------------------------

TESTS + APP DEVELOPMENT
Insight Points: X has been/could/would be more helpful/useful, because/as Y
Creating a function that can see inside values that are loop would be useful, as you can check what values have been returned
before an endless loop;

if (i < 2) {
    console.log(str);
}

This condition will very useful, or just someway for you return something back once;

-----------------------------
Doc Info - 19/09/2017 - 12:45 
-----------------------------

Still need to some separate testing from changing Rad -> Deg.
Therefore these tests are kept separate for me.


TESTS

Managed to test a complex string - ((3+4)+cos(5)+ln(e)).

Note - after this, I need to go off to my doctors appointment

-------------------------------------------------------------------------------------
Doc Info - 18/09/2017 - 11:33 -> 18/09/2017 - 23:43
-------------------------------------------------------------------------------------

-----------------------------
Doc Info - 18/09/2017 - 23:39 
-----------------------------

TESTS + APP DEVELOPMENT

Managed to pass all the previous tests, including
Parenthesise + Arithmetic
Cosine
Natural log

Still need to test more complex strings such as 
((3+4)+cos(5)+ln(e))

1) If it passes that tests, I will a few more differented test. With multiple other combinations.
2) Then fix the numerical rounding error

The Google Calculator only returns values 12 significant figures or less. Also I need to know if 
it still returns the 0 at the end of those figures

-----------------------------
Doc Info - 18/09/2017 - 15:37 
-----------------------------

Insight Points: X has been/could/would be more helpful/useful, because/as Y
> More In-depth research and planning would be more useful, as during development we do not want to 
just discover recent pitfalls that could have been avoided

-----------------------------
Doc Info - 18/09/2017 - 14:57 
-----------------------------

TESTS + APP DEVELOPMENT

Before my tea break, found a regex function that would enable me to match the most inner bracket first
\([^()"]*(?:"[^"]*"[^()"]*)*\)

((("1"))(("2"))("3")) => `"1"` is picked
(("1")(("2"))("3")) => `"1"` is picked again
((("2"))("3")) => `"2"` is now picked 
-----------------------------
Doc Info - 18/09/2017 - 14:37 
-----------------------------

TESTS + APP DEVELOPMENT

Time to introduce Parenthesise into the equations for testing

-----------------------------
Doc Info - 18/09/2017 - 14:20 
-----------------------------

DESIGN

Manage to almost create a complete replica - the shift of focus from TEST + APP DEV => DESIGN
was due to the folks needing a mock image of it being use for "" ;

Except for;
Tactile Response
> Button Hover Border
> Calculator Hover -> Screen Border 
> Calculator Focus -> Screen Border 

Color schemes
> Answer Div -> innerHTML of Ans is at the nearer to the bottom of the div container
> Answer Div -> Font color should not be black and be a grayish color

-----------------------------
Doc Info - 18/09/2017 - 11:33
-----------------------------

DESIGN

Time will placed aside to polish the look of the Google Calculator clone.

-------------------------------------------------------------------------------------
Doc Info - 17/09/2017 - 22:53 [End of Session]
-------------------------------------------------------------------------------------

TESTS + APP DEVELOPMENT

Made a pretty big break through with testing

Being able to test these combinations;

Parenthesise + Arithmetic
Factorial
Multiple Factorials
Percentage + Factorial
Factorial + Percentage
Factorial + Percentage + Arithmetic Assortment
Simple Power
Complex Power
Factorial + Complex Power
Percentage + Complex Power

Which is incredible for 2 days of work

1) Coding logic on paper
2) Application development

Which could mean it may have been a big waste of time, coding the tests the first place. 
However this would not be conclusive evidence that testing was a waste of time. However I did gain 
a lot of understanding the app I created via testing, with very useful insights such as grouping 
the features in precedential groups, and learnt to do random dynamical test, but...

Was it worth the time + effort - 9 days??

-------------------------------------------------------------------------------------
Doc Info - 16/09/2017 - 21:49 -> 16/09/2017 - 22:32
-------------------------------------------------------------------------------------

Spent more than a couple of hours writing the logic after creating the tests. Also I've come up some ideas

Insight Points: X has been/could/would be more helpful/useful, because/as Y
> Jumbled random tests could be useful, as they test for false positives, because we can find out if the calculator will still give an answer, 
even though the input is Invalid
> We can optimise the factorial function, by figuring out what the highest factorial could react just beyond Number.MAX_VALUE.
So that we can return infinity, without having to calculate that large number. Reason being because it require processor time.

Regex values to detect certain part of the string. In the order of precedence; as it affects the way the regex matches.

Factorials .5! or 1.5! or 3! => /([-+]?[0-9]*\.?[0-9]+[\!])/g

Percentages .5% or 1.5% or 3% => /([-+]?[0-9]*\.?[0-9]+[\%])/g

Power => 3^4 or 3^-0.4^0.4 => /([-+]?[0-9]*\.?[0-9]+[^])+([-+]?[0-9]*\.?[0-9]+)/g
>> 3^4^4^4 converted to 3^(4^(4^4)) for calculating convenience ??????????????????????????
Ruled out situations where Power will affected by any other group

Functions =>  log(5.6) or cos(.5) or tan(-5)
((?:ln)?(?:log)?(?:sin)?(?:cos)?(?:tan)?\([-+]?[0-9]*\.?[0-9]+\))

May have individual ones where you can 

Bracket + Arithmetic => (33*33-33+33) => /\(([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)\)/g

End Arithmetic Calculation => 33*33-33+33 /([-+]?[0-9]*\.?[0-9]+[\/\+\-\*])+([-+]?[0-9]*\.?[0-9]+)/g


Note to self- the reason I didn't want to add a feature at a time, is that I would have had to change the entire configuration for every new 
feature. Which would have been pretty annoying

Possible Problem,
> Keeping 1e+30 values with exponents, stored as Answer
-------------------------------------------------------------------------------------
Doc Info - 16/09/2017 - 17:58
-------------------------------------------------------------------------------------

Insight Points: X has been/could/would be more helpful, because/as Y

Decided that optimising the app which would be more helpful, as it can return calculations fasters, and
the entire process will be more efficient 


-------------------------------------------------------------------------------------
Doc Info - 16/09/2017 - 16:36
-------------------------------------------------------------------------------------

TESTS

So these tests work;
"BASIC ARITHMETIC TESTS =>"
"INDIVIDUAL FUNCTION + CONSTANT TESTS =>"
"POWER INDEX TESTS =>"
"2 COMBINATION FEATURES =>"
"3 COMBINATION FEATURES =>"
"SPECIFIC FEATURE =>"

Okay time to develop the app, all thunderbirds are go


-------------------------------------------------------------------------------------
Doc Info - 16/09/2017 - 16:24
-------------------------------------------------------------------------------------

Insight Points: X has been/could/would be more helpful, because/as Y
> Testing has been really helpful, as whenever I decide to refactor, I can do so more confidently. So that when I break something,
I can retrace my steps easily.

TESTS

I've decided to create some way to solve the floating point error, rather solving it as part of the tests.

Time to go through each individual tests, one last time.

-------------------------------------------------------------------------------------
Doc Info - 16/09/2017 - 15:07
-------------------------------------------------------------------------------------

TESTS
Manage to complete the "SPECIFIC FEATURE" Test. Which helped me to fix that bug from => 15/09/2017 - 17:50, 
really happy that I managed to solve a problem with 2 birds one stone. So as all the tests have been completed,
the next tasks will be refactor the entire code base, check over and comment on specific parts. The start making the 
application.

Here is the documentation for it

// Specific case tester is required, to re test one specific case
// thus working backwards, there would be a need for a dynamically made tests
// -subtract for(), createTestCase(), testCase Object Props
// keeping some of the logic behind - 
// As I am just testing a specific case, the plan is remove randomisation entirely

// Was thinking... how is this different from set test cases, 
// set test cases are simple, you entire strings and you have to calculate the return value before hand
// Whereas I have already set up some code aside for calculating the expected value

-------------------------------------------------------------------------------------
Doc Info - 15/09/2017 - 16:03 - 15/09/2017 - 23:18
-------------------------------------------------------------------------------------

TESTS
Nice! Finished "2 feature combination tests" and managed to arrange the random generation so that both "y + f(x)" and "f(x) + y", where "+" operator resemble any of the 
current 4 arithmetic operators.
So in theory, creating a "3 feature combination tests" should take under 5 mins, however before I do that, time should be spent refactoring the entire file.

Refactor Before 432 lines, and everything is readable.

-----------------------------
Doc Info - 15/09/2017 - 16:03
-----------------------------

TESTS

After Refactoring period 432 -> 356. Code is easier to read + comments. These aren't the best quantifiers, but it is a start.
1) Finished refactoring my code
2) Finished creating the 3 feature combination tests

The last that is required is to remove the floating point errors from the code.

Currently done a simply test with 

0.2 + 0.4 = 0.6000000000000001
0.2 * 0.4 = 0.08000000000000002
a nice way to get rid of this is through use of multiplication, in this case any other integer, I used 10 as it easiest to follow

((0.2 * 10) + (0.4 * 10))/ 10 = 0.6
((0.2 * 10) * (0.4 * 10))/ 10 = 0.08

However I'm gonna run through a randomized sample of 100, and check if there is any floating point errors as previous.

-----------------------------
Doc Info - 15/09/2017 - 17:50
-----------------------------

Still found some mistakes. Will note them down here.
'cos(4 + 12) - 2' to equal NaN
'(15 - cos(12))%' to equal NaN
'(17 * 3 * 16)^12' to equal NaN
'(5 - 20^17)^6' to equal NaN
'(4^9 - 19)!' to equal NaN
'12 - log(5 + 15)' to equal NaN
'log(sin(18)) - 12' to equal NaN


Includes an error - Invalid left-hand side expression in postfix operation?

Some mistakes require me to advance my current mathematical knowledge, such factorial floats. So in the meantime they cannot yet be 
fixed.

Pain Point - 

-----------------------------
Doc Info - 15/09/2017 - 20:15
-----------------------------


Solved the error - Includes an error - Invalid left-hand side expression in postfix operation?
At some point the eval function would have had to experience.

eval(3++4), which caused the error


-----------------------------
Doc Info - 15/09/2017 - 21:14
-----------------------------

Pain Points Description: X when I Y, as Z
> It's annoying when I want to do selective testing, as what would happen is that I run the random tests.
However there will still be errors. I've been ignoring this pain for some time now. I'm gonna find a way to make specified tests.

The plan is to test for specific cases. Which can customized by the developer. As some test cases come back as incorrect, thus this specific
test case can be examined for any faults; allows the developer underlying design of the tests more as well.  
-----------------------------
Doc Info - 15/09/2017 - 23:18
-----------------------------
Pain Points Description: X when I Y, as Z
> It isn't pragmatic when I leave a Job unfinished and is not left in a nice position, as it would difficult to pick off.
From when where I last left it.

-------------------------------------------------------------------------------------
Doc Info - 14/09/2017 - 20:37 => 15/09/2017 - 1:01
-------------------------------------------------------------------------------------
TESTS

Time to go back to drawing board, so 2 things to keep a major eye on. 

1) If it returns back the same number as the benchmark - i.e. Google calculator
2) Whether the precedence of operation is correct

So I've already tested all the functions in their individual groups, now lets test what happens when we mix
and match each of these groups together.

These is still small problem with floating point errors;

-----------------------------
Doc Info - 14/09/2017 - 20:37
-----------------------------
TESTS

Yet another layer of complexity, apparently the answer that is returned is in radians. Meaning I should I have
fully understood what the function was returning in the first place.


-----------------------------
Doc Info - 14/09/2017 - 16:26
-----------------------------
TESTS

Just found out that console.log still fires even if it inside your describe.skip().

Insight Points: X has been/could/would be more helpful, because/as Y
Testing has been helpful, because I discovered so many cases, which were preconceived at the time
> This is what came up "expected '3 - 7 * 7' to equal -28"
> Which made me think what if you had a situation like this 9 + 50 - 5 * 6 / 2 => 44

Break this problem down, into use cases, as I can relate to them

f(x) can be any ln(x), sin(x), x!, x^y, these all happen before any arithmetic operator.

So here is where we can use a condition, say we have x + y. If the next feature is f(x). We an calculate 
f(x + y) => Z

however if the next feature is arithmetic operator, x + y * z, then we halt the calculation.
Again, if the next feature is an function 'f(x)'.

So now we can declare a condition, where if the final feature utilized is a function.

We can use the eval function to calculate x + y * z, eval(x + y * z) => a 
f(a) => B

functions need f(value) convert arithm string => value, whereas
arith need a + b * c need more values added to the end via as string, so they would need to convert a value => arithm String


if(feature[i + 1].name !== "Arith"){
    calculate = eval(calculateTotal)
}

-----------------------------
Doc Info - 14/09/2017 - 23:41
-----------------------------

TESTS
We can make it a try catch, and whenever NaN is calculated, returned "Error".

-----------------------------
Doc Info - 14/09/2017 - 23:57
-----------------------------

TESTS
Apparently all my tests work for "2 feature combination tests", I am gonna go through more and double check over these test.
And test for Radians => Degs

-----------------------------
Doc Info - 14/09/2017 - 23:57
-----------------------------

TESTS

That's fine after my break I've managed to fix it, the issue with the degrees to radians from earlier.
Still need to do more tests for "2 feature combination tests", should do that tomorrow. Plus it would be nice to add somethings such as 12 + f(x) as well, which I haven't done yet;


-------------------------------------------------------------------------------------
Doc Info - 11/09/2017 - 12:44 - WAS NEVER CLOSED
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

--------------------------------------------------------------------------------------

--------------------------------------------------------------------------------------
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