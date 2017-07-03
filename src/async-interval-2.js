// Node.js setInterval demonstration 2

/*
  Execution example
  To output integers from 4 through 10 at 1-second intervals, execute:
  node async-interval-2 4 10 1000
*/

// Import a validator function.
const areAscIntRangeAndMs =
  module.require('./areAscIntRangeAndMs').areAscIntRangeAndMs;

/*
  Declare and define a function that sets an interval timer and uses it
  to output the integers in a series at a specified time interval, or does
  nothing if the arguments are invalid.
*/
const integersOut = (from, through, interval) => {
  // If the arguments are valid:
  if (areAscIntRangeAndMs(from, through, interval)) {
    // Declare and initialize a cursor.
    let current = Number.parseInt(from);
    // Declare a timer.
    let timer;
    /*
      Declare and define a function that outputs an integer greater than
      a specified integer by a specified offset and, if the integer is the
      final one in a specified series, clears the timer.
    */
    const nextIntegerOut = (finish) => {
      // Output the next integer.
      console.log(current);
      /*
        If it is the final integer in the series, clear the timer. If not,
        increment the counter.
      */
      current === finish ? clearInterval(timer) : current++;
    };

    /*
      Set a timer to output the integers in the specified series at intervals
      of the specified number of milliseconds.
    */
    timer = setInterval(
      nextIntegerOut, Number.parseInt(interval), Number.parseInt(through)
    );
  }
};

/*
  Execute it, using the first 3 command-line arguments as the series start,
  series end, and interval in milliseconds, respectively.
*/
integersOut(...process.argv.slice(2));
