/*
  Validation of 3 arguments defining an ascending integer range and a time
  interval in milliseconds.
*/

/*
  Declare, define, and export a function that returns whether its first 3
  arguments are integers, the second is no smaller than the first, the
  interval is at least 0, and the interval is not intractably large.
*/
exports.areAscIntRangeAndMs = (from, through, interval) => {
  // Return whether the arguments are valid.
  return (
    from !== undefined && through !== undefined && interval !== undefined
    && Number.isInteger(from = Number.parseInt(from))
    && Number.isInteger(through = Number.parseInt(through))
    && Number.isInteger(interval = Number.parseInt(interval))
    && from <= through && 0 <= interval && interval <= 2147483647
  );
};
