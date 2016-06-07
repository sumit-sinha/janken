/**
 * function to control the clock
 * @param args JSON object with below expected keys
 *			- maxCount: the maximum value from which timer starts
 *			- element: DOM element where value will be printed
 */
export default function timer(args) {

	if (args == null) {
		args = {};
	}

	var max = args.maxCount || 15;
	var dom = args.element || document.body;

	var interval = null;
	var currentValue = max;

	/**
	 * clears timer interval
	 * @param type can be "p","s","r" or "f" defining who called this function
	 */
	var clearInterval = function(type) {

		if (interval == null) {
			return;
		}

		window.clearInterval(interval);

		if (typeof args.onIntervalOver.fn === "function") {

			if (args.onIntervalOver.args == null) {
				args.onIntervalOver.args = {};
			}

			args.onIntervalOver.args.type = type;
			args.onIntervalOver.fn(args.onIntervalOver.args);
		}
	};

	/**
	 * change the value in DOM
	 */
	var updateDom = function() {
		if (currentValue > 0) {
			dom.innerHTML = currentValue;
			dom.setAttribute("value", currentValue);
		} else {
			dom.innerHTML = "";
			dom.setAttribute("value", "");
		}
	};

	/**
	 * starts the timer from current count i.e.
	 * if timer was paused then it will start from last value otherwise from max
	 */
	var start = function() {

		interval = setInterval(function() {
			--currentValue;
			updateDom();

			if (currentValue === 0) {
				clearInterval("f");
				return;
			}
		}, 1000)
	};

	/**
	 * reset a clock back to max value
	 */
	var reset = function() {
		clearInterval("r");
		currentValue = max;
		updateDom();
	};

	/**
	 * stops the timer in middle of execution and set the value to 0
	 */
	var stop = function() {
		clearInterval("s");
		currentValue = 0;
		updateDom();
	};

	/**
	 * pause the countdown
	 */
	var pause = function() {
		clearInterval("p");
	};

	return {
		start: start,
		reset: reset,
		stop: stop,
		pause: pause
	}
}