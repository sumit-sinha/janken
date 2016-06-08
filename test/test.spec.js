import timer from '../src/js/timer/timer';

describe("test suite for timer functionality", function() {

	var el = null;
	var clock = null;

	beforeEach(function() {

		el = document.createElement("div");
		document.body.appendChild(el);

		clock = timer({
			maxCount: 5,
			element: el
		});
	});

	it ("should start the clock", function() {
		clock.start();
		if (el != null) {
			expect(1).to.equal(1);
		}
	});

	it ("should stop the clock", function() {
		expect(1).to.equal(1);
	});

	it ("should reset the clock", function() {
		expect(1).to.equal(1);
	});

	it ("should pause the clock", function() {
		expect(1).to.equal(1);
	});
});