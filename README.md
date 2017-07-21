# async-timer-demos
Demonstrations of asynchronous timer methods in JavaScript

## Project Members

[Jonathan Pool](https://github.com/jrpool)

## modules

```
async-interval-1
async-interval-2
async-interval-3
async-timeout
```

## Discussion

This project contains demonstrations of methods of using timers to schedule events with JavaScript.

The demonstrations are designed to perform the tasks defined by Ilya Kantor in [“Scheduling: setTimeout and setInterval”](https://javascript.info/settimeout-setinterval), with some modifications, including making Node the execution environment, making the time interval a variable, and validating arguments.

The modules use built-in Node functions that perform user-defined actions either one time or repetitively after a specified time has elapsed.

The modules are intended to be mainly self-documenting. However, if you are using these demonstrations as you learn JavaScript fundamentals, the discussion below may be informative.

### `async-interval':

The 3 `async-interval` modules have the following details in common:

- Given a range of integers and a duration of time specified in command-line arguments, they output the consecutive integers of that range in ascending order, waiting for the time before outputting each integer.

- They are designed to be executed by Node.

- They check to ensure that the command-line arguments are valid, after importing the code for this validation from module `areAscIntRangeAndMs`.

- They each define an `integersOut` function that receives the arguments given to the module and, if they are valid, sets an interval timer, instructing it to execute another function after each elapsation of the interval. That other function outputs the next integer, increments the cursor that identifies the next integer, and, if it is the last one in the range, also clears (i.e. unsets) the timer.

They differ in how they organize this operation. Each version after version 1 integrates the operations more than the one before.

In `async-interval-1`, the function that outputs each integer, `nextIntegerOut`, is defined, as is `integersOut`, in global scope. It gets 2 arguments, defining the endpoints of the range, from the interval timer, which, in turn, gets them from `integersOut` in the statement that defines the timer. The `nextIntegerOut` function also needs, and acts on, 2 more values, which it gets from global variables: (1) the current position of the cursor (i.e. how many integers have been output so far), which it increments, and (2) the identifier of the timer, which it eventually clears.

In `async-interval-2`, the function that outputs each integer, `nextIntegerOut`, is defined within the scope of the `integersOut` function. The latter function localizes and passes to `nextIntegerOut` the command-line-given final range endpoint in the same manner as in `async-interval-1`, but not the initial endpoint, since the cursor in this version is the actual next integer, not an offset from the start. It declares the cursor and the timer identifier in its own scope before `nextIntegerOut` is defined, so those variables are not global.

In `async-interval-3`, the function that outputs each integer is likewise defined within the scope of the `integersOut` function, but here is anonymous. No arguments are passed to it; instead, it gets the values of all 3 needed variables from available variables, including the final range endpoint given on the command line.

These modules deal distinctly with the need to make the `timer` variable available to the function that needs to clear the timer. The `timer` variable gets its value from the `integersOut` function.

- In version 1, `timer` is declared globally before `nextIntegerOut` is defined. Later `integersOut` assigns a value to it, and after that `nextIntegerOut` uses that value.

- In version 2, `integersOut` declares `timer`` in its own scope before defining `nextIntegerOut`. As in version 1, `integersOut` then assigns a value to it, before `nextIntegerOut` uses it.

- In version 3, the declaration of `timer` and the definition of the anonymous function that will clear the timer occur in the very same statement.

The execution order in version 3 may seem counterintuitive. On its face, it looks as if `timer` is declared and defined only after the invocation of `setInterval` has been evaluated by the JavaScript compiler. If so, then the compiler could know what value to assign to `timer`. The compiler would need to reject the appearance of `timer` within the invocation, because `timer` would not yet exist.

Version 3 runs correctly, however, because the execution order differs from how it may seem. A statement of the form `const timer = setInterval(…);` is compiled as if it were 2 statements followed by a contract prohibiting any reassignment on pain of type error:

```
let timer;
timer = setInterval(…);
```

Therefore, when the anonymous function references `timer`, `timer` already exists. At that point it is undefined, but that does not prevent compilation. The function will use the actual value of `timer` only when the function is executed, and in fact not until the last time it is executed. By then `integersOut` will have given the `timer` constant its value.

Running `npm run lint` produces a warning about `timer` in version 2. This appears to be a bug in eslint’s `prefer-const` rule, which should not demand that a declaration with no assignment be made with `const`, since such a declaration is invalid. If the idea behind this warning is that the assignment should be made earlier, namely combined with the declaration, that would not work here, because it would cause `nextIntegerOut` to be referenced before it is declared. Because of this apparent bug, the `eslint` configuration in this project makes that rule produce warnings instead of errors.

### `async-timeout':

The `async-timeout` module has the same functionality as the `async-interval` modules. It implements that functionality with the recursive use of `setTimeout`, instead of doing so with a one-time use of `setInterval`.

The module treats the first iteration differently from those after it, in order to replicate the `async-interval` functionality, namely to output each integer after the specified delay, and after the last integer to exit with no delay.

## Installation and Setup

0. These instructions presuppose that [npm][npm] is installed.

1. Make the parent directory of what will be the project’s directory your working directory.

2. Clone this repository into it, thereby creating the project directory, by executing:

    `git clone git@github.com:jrpool/async-timer-demos.git async-timer-demos`

2. Make the project directory your working directory by executing:

    `cd async-timer-demos`

3. Install required dependencies (see `package.json`) by executing:

    `npm i`

## Usage and Examples

Each module contains instructions for its command-line execution.

[npm]: https://www.npmjs.com/
