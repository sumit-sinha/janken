
import game from '../src/js/module';

describe('test suite for game module', function() {

	var janken = null;
	var sinonClock = null;
	var clockEl = null;
	var overlayEl = null;
	var overlayMessageEl = null;
	var scoreOneEl = null;
	var scoreTwoEl = null;
	var playerOneNameEl = null;
	var playerTwoNameEl = null;
	var playerSelectionOneEl = null;
	var playerSelectionTwoEl = null;

	var paperButtonEl = null;
	var rockButtonEl = null;
	var scissorButtonEl = null;

	/**
	 * function to create DOM for game
	 */
	var prepareDOM = function() {
		clockEl = document.createElement("div");
		document.body.appendChild(clockEl);

		overlayEl = document.createElement("div");
		overlayEl.className = "overlay";
		document.body.appendChild(overlayEl);

		overlayMessageEl = document.createElement("div");
		document.body.appendChild(overlayMessageEl);

		scoreTwoEl = document.createElement("div");
		document.body.appendChild(scoreTwoEl);

		scoreOneEl = document.createElement("div");
		document.body.appendChild(scoreOneEl);

		playerOneNameEl = document.createElement("div");
		document.body.appendChild(playerOneNameEl);

		playerTwoNameEl = document.createElement("div");
		document.body.appendChild(playerTwoNameEl);

		playerSelectionOneEl = document.createElement("div");
		document.body.appendChild(playerSelectionOneEl);

		playerSelectionTwoEl = document.createElement("div");
		document.body.appendChild(playerSelectionTwoEl);

		paperButtonEl = document.createElement("button");
		paperButtonEl.setAttribute("data-value", "2");
		document.body.appendChild(paperButtonEl);

		rockButtonEl = document.createElement("button");
		rockButtonEl.setAttribute("data-value", "1");
		document.body.appendChild(rockButtonEl);

		scissorButtonEl = document.createElement("button");
		scissorButtonEl.setAttribute("data-value", "3");
		document.body.appendChild(scissorButtonEl);
	};

	/**
	 * function to initialze game
	 * @param playerName name of player as configuration parameter
	 */
	var createGame = function(playerName) {
		janken = game({
			player: {
				name: playerName,
				dom: {
					player1: playerOneNameEl,
					player2: playerTwoNameEl,
					playerSelection1: playerSelectionOneEl,
					playerSelection2: playerSelectionTwoEl
				}
			},
			timer: {
				maxCount: 10,
				element: clockEl
			},
			overlay: {
				container: overlayEl,
				message: overlayMessageEl
			},
			scoreline: {
				score1: scoreOneEl,
				score2: scoreTwoEl
			},
			buttons: [{
				value: 1,
				dom: rockButtonEl
			}, {
				value: 2,
				dom: paperButtonEl
			}, {
				value: 2,
				dom: scissorButtonEl
			}]
		});
	};

	beforeEach(function() {
		
		prepareDOM();
		sinonClock = sinon.useFakeTimers();

	});

	it('should set proper name for player', function() {
		
		createGame("Somename");

		janken.start();

		expect(playerOneNameEl.innerHTML).to.equal('Somename');
	});


	it('should select a random computer player if computer vs computer game', function() {
		
		createGame("||computer||");

		janken.start();

		expect(playerOneNameEl.innerHTML).to.not.equal('||computer||');
	});

	it('should start the timer indicating the start of game', function() {
		
		createGame("Somename");

		janken.start();

		expect(clockEl.innerHTML).to.equal('');

		sinonClock.tick(1000);

		expect(clockEl.innerHTML).to.equal('9');
	});

	it('should attach listeners for each of the buttons i.e. button for rock, paper and scissors if not a computer player', function() {
		
		createGame("Somename");

		janken.start();

		rockButtonEl.click();

		expect(playerSelectionOneEl.className).to.equal('selected rock');

		paperButtonEl.click();

		expect(playerSelectionOneEl.className).to.equal('selected paper');

		scissorButtonEl.click();

		expect(playerSelectionOneEl.className).to.equal('selected scissor');
	});

	it('should not attach listeners for each of the buttons for a computer player', function() {
		
		createGame("||computer||");

		janken.start();

		rockButtonEl.click();

		expect(playerSelectionOneEl.className).to.equal('');

		paperButtonEl.click();

		expect(playerSelectionOneEl.className).to.equal('');

		scissorButtonEl.click();

		expect(playerSelectionOneEl.className).to.equal('');
	});

	it('should show message about game result once match is over', function() {
		
		createGame("||computer||");

		janken.start();

		expect(overlayEl.className).to.equal('overlay');
		expect(overlayMessageEl.innerHTML).to.equal('');

		sinonClock.tick(10000);

		expect(overlayEl.className).to.equal('overlay show');
		expect(overlayMessageEl.innerHTML).to.not.equal('');
	});

	it('should generate a random response for computer player', function() {
		
		// a random response can be undefined also which is fully accepted
		// this means that computer player didn't selected anything

		createGame("||computer||");

		janken.start();

		sinonClock.tick(10000);

		expect(playerSelectionOneEl.className.split(' ').length).to.equal(2);
	});

	it('should update the scoreline once the match is over', function() {

		createGame("||computer||");

		janken.start();

		expect(parseInt(scoreOneEl.innerHTML) >= 0 || parseInt(scoreTwoEl.innerHTML) >= 0).to.equal(false);

		sinonClock.tick(10000);

		expect(parseInt(scoreOneEl.innerHTML) >= 0 || parseInt(scoreTwoEl.innerHTML) >= 0).to.equal(true);
	});

	it('should remove the overlay once user click on continue match', function() {

		createGame("||computer||");

		janken.start();

		sinonClock.tick(10000);

		expect(overlayEl.className).to.equal("overlay show");

		janken.continue();

		expect(overlayEl.className).to.equal("overlay");
	});

	it('should update the player selection area once user clicks on continue', function() {

		createGame("Somename");

		janken.start();

		rockButtonEl.click();

		expect(playerSelectionOneEl.className).to.equal("selected rock");

		sinonClock.tick(10000);

		expect(playerSelectionOneEl.className).to.equal("selected rock");

		janken.continue();

		expect(playerSelectionOneEl.className).to.equal("selected waiting");
	});

	it('should reset the clock once user clicks on continue', function() {

		createGame("Somename");

		janken.start();

		rockButtonEl.click();

		sinonClock.tick(10000);

		expect(clockEl.innerHTML).to.equal("");

		janken.continue();

		expect(clockEl.innerHTML).to.equal("10");

		sinonClock.tick(1000);

		expect(clockEl.innerHTML).to.equal("9");
	});

	it('should reset the score if user clicks on restart match', function() {

		createGame("Somename");

		janken.start();

		sinonClock.tick(10000);

		janken.restart();

		expect(scoreOneEl.innerHTML).to.equal("0");
		expect(scoreTwoEl.innerHTML).to.equal("0");
	});

	it('should remove the overlay once user click on restart match', function() {

		createGame("||computer||");

		janken.start();

		sinonClock.tick(10000);

		expect(overlayEl.className).to.equal("overlay show");

		janken.restart();

		expect(overlayEl.className).to.equal("overlay");
	});

	it('should update the player selection area once user clicks on restart', function() {

		createGame("Somename");

		janken.start();

		rockButtonEl.click();

		expect(playerSelectionOneEl.className).to.equal("selected rock");

		sinonClock.tick(10000);

		expect(playerSelectionOneEl.className).to.equal("selected rock");

		janken.restart();

		expect(playerSelectionOneEl.className).to.equal("selected waiting");
	});

	it('should reset the clock once user clicks on restart', function() {

		createGame("Somename");

		janken.start();

		rockButtonEl.click();

		sinonClock.tick(10000);

		expect(clockEl.innerHTML).to.equal("");

		janken.restart();

		expect(clockEl.innerHTML).to.equal("10");

		sinonClock.tick(1000);

		expect(clockEl.innerHTML).to.equal("9");
	});

});
