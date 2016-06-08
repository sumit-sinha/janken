import timer from '../src/js/timer/timer';

describe("test suite for timer functionality", function() {

	var el = null;
	var clock = null;
	var sinonClock = null;

	beforeEach(function() {

		el = document.createElement("div");
		document.body.appendChild(el);

		clock = timer({
			maxCount: 5,
			element: el
		});

		sinonClock = sinon.useFakeTimers();
	});

	afterEach(function() {
		sinonClock.restore();
	});

	it ("should start the clock", function() {
		clock.start();

		expect(el.innerHTML).to.equal('');

		sinonClock.tick(1000);

		expect(el.innerHTML).to.equal('4');
	});

	it ("should stop the clock", function() {

		clock.start();
		sinonClock.tick(2000);
		expect(el.innerHTML).to.equal('3');

		clock.stop();

		expect(el.innerHTML).to.equal('');
	});

	it ("should reset the clock", function() {
		clock.start();
		sinonClock.tick(2000);
		expect(el.innerHTML).to.equal('3');

		clock.reset();

		expect(el.innerHTML).to.equal('5');
	});

	it ("should pause the clock", function() {
		clock.start();
		sinonClock.tick(2000);
		expect(el.innerHTML).to.equal('3');

		clock.pause();

		sinonClock.tick(2000);

		expect(el.innerHTML).to.equal('3');
	});
});