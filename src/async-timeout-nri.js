// Node.js setTimeout demonstration

/*
  Execution example
  To output integers from 4 through 10 at 1-second intervals, execute:
  node async-timeout 4 10 1000
*/

// Modified from https://javascript.info/settimeout-setinterval

// Import a validator function.
const areAscIntRangeAndMs =
  module.require('./areAscIntRangeAndMs').areAscIntRangeAndMs;

/*
  Declare and define a function that outputs a specified integer in a
  specified range after a specified delay and executes itself for the next
  integer in the range if there is one, or does nothing if the arguments
  are invalid.
*/
const nextIntegerOut = (current, through, delay) => {
  /*
    Set a timer to output and increment the next integer and re-execute
    this function after the specified delay, if the new next integer exists.
  */
  if (current <= through) {
    // Output the next integer and increment it.
    console.log(current++);
    setTimeout(() => {nextIntegerOut(current, through, delay);}, delay);
  }
};

/*
  If the command-line arguments are valid, invoke the function, using the
  first 3 command-line arguments as the range start, range end, and delay in milliseconds, respectively.
*/
// Identify the command-line arguments.
const args = process.argv.slice(2);
// If they are valid:
if (areAscIntRangeAndMs(...args)) {
  // Invoke the function on the first integer in the range.
  nextIntegerOut(
    Number.parseInt(args[0]),
    Number.parseInt(args[1]),
    Number.parseInt(args[2])
  );
}
