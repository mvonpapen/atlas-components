//https://api.highcharts.com/highcharts/colorAxis.type
//https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/coloraxis/logarithmic-with-emulate-negative-values/

/**
 * Custom Axis extension to allow emulation of negative values on a logarithmic
 * color axis. Note that the scale is not mathematically correct, as a true
 * logarithmic axis never reaches or crosses zero.
 */

export default function (H) {
  H.addEvent(H.Axis, 'afterInit', function () {
    const logarithmic = this.logarithmic;

    if (logarithmic && this.options.allowNegativeLog) {

      // Avoid errors on negative numbers on a log axis
      this.positiveValuesOnly = false;

      // Override the converter functions
      logarithmic.log2lin = num => {
        const isNegative = num < 0;

        let adjustedNum = Math.abs(num);

        if (adjustedNum < 10) {
          adjustedNum += (10 - adjustedNum) / 10;
        }

        const result = Math.log(adjustedNum) / Math.LN10;
        return isNegative ? -result : result;
      };

      logarithmic.lin2log = num => {
        const isNegative = num < 0;

        let result = Math.pow(10, Math.abs(num));
        if (result < 10) {
          result = (10 * (result - 1)) / (10 - 1);
        }
        return isNegative ? -result : result;
      };
    }
  });
}
