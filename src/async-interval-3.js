// Node.js setInterval demonstration 3

/*
  Execution example
  To output integers from 4 through 10 at 1-second intervals, execute:
  node async-interval-3 4 10 1000
*/

// Modified from https://javascript.info/settimeout-setinterval

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
    // Identify the range end as an integer.
    const last = Number.parseInt(through);
    // Declare and initialize a cursor.
    let current = Number.parseInt(from);
    /*
      Set a timer to output the integers in the specified series at intervals
      of the specified number of milliseconds.
    */
    const timer = setInterval(
      () => {
        // Output the next integer and increment it.
        console.log(current++);
        // If the next integer would be beyond the series, clear the timer.
        current > last && clearInterval(timer);
      },
      Number.parseInt(interval)
    );
  }
};

/*
  Execute it, using the first 3 command-line arguments as the series start,
  series end, and interval in milliseconds, respectively.
*/
integersOut(...process.argv.slice(2));
