require('../css/main.scss');

import game from './module';

(function() {

	var janken = null;

	var jankenButtons = [{
		value: 1,
		dom: document.getElementById("rock")
	}, {
		value: 2,
		dom: document.getElementById("paper")
	}, {
		value: 2,
		dom: document.getElementById("scissor")
	}]

	/**
	 * initiate a new game
	 */
	window.startNewGame = function(args) {

		// hide the initial option
		document.getElementsByClassName("land-screen")[0].style.display = "none";

		janken = game({
			player: {
				name: args.player || "||computer||",
				dom: {
					player1: document.getElementsByClassName("player-1")[0],
					player2: document.getElementsByClassName("player-2")[0],
					playerSelection1: document.getElementById("player-1-selection"),
					playerSelection2: document.getElementById("player-2-selection")
				}
			},
			timer: {
				maxCount: 10,
				element: document.getElementsByClassName("time-box")[0]
			},
			overlay: {
				container: document.getElementsByClassName("overlay")[0],
				message: document.getElementById("success-message")
			},
			scoreline: {
				score1: document.getElementsByClassName("score-1")[0],
				score2: document.getElementsByClassName("score-2")[0]
			},
			buttons: jankenButtons
		});

		janken.start();
	};

	/**
	 * function to restart the game with new scoreline
	 */
	window.restartMatch = function() {

		if (janken == null) {
			return;
		}

		janken.restart();
	};

	/**
	 * function to continue the existing game with same scoreline
	 */
	window.continueGame = function() {

		if (janken == null) {
			return;
		}

		janken.continue();
	};

}());

