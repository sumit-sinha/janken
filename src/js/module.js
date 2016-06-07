import timer from './timer/timer';

/**
 * represents a game to be played
 * @param args JSON configuration for game
 */
export default function game(args) {

	var clock = null;

	var firstPlayer = null;
	var secondPlayer = null;

	var firstPlayerWinCount = 0;
	var secondPlayerWinCount = 0;

	var playerOneResponse = null;

	var computerPlayer = -1;
	var isFirstPlayerAComputer = false;
	var computerPlayers = ["Sam", "Bob", "Martha"];

	var class_array = ["rock", "paper", "scissor"];
	
	/**
	 * randomly select computer option out of rock paper and scissor
	 * @return Integer where
	 *			1 - Rock
	 *			2 - Paper
	 *			3 - Scissor
	 */
	var getComputerSelection = function() {

		var value = -1;
		var random = Math.floor(Math.random() * 50);
		for (var i = 0; i < random; i++) {
			if (i === (random - 1)) {
				value = Math.floor(Math.random() * 3) + 1;
			}
		}

		if (value < 1 && value > 3) {
			console.log("Unexpected exception. Unable to generate random number for computer player. Value: " + value);
		}

		return value;
	};

	/**
	 * function to show message and further options once a match is over
	 * @param config JSON config
	 * @param message String
	 */
	var showMatchOverMessage = function(config, message) {
		if (config == null) {
			return;
		}

		config.overlay.container.className = "overlay show";
		config.overlay.message.innerHTML = message;
	};

	/**
	 * function called when clock finished the countdown or paused
	 * @param config JSON object with clock related information
	 */
	var onIntervalOverCallback = function(config) {

		if (config.type === "f") {
			// i.e. finished execution

			
			var playerTwoResponse = getComputerSelection();

			if (isFirstPlayerAComputer) {
				playerOneResponse = getComputerSelection() ;
			}

			// update UI
			config.player.dom.playerSelection1.className = "selected " + class_array[playerOneResponse  - 1];
			config.player.dom.playerSelection2.className = "selected " + class_array[playerTwoResponse  - 1];

			if (class_array[playerOneResponse  - 1] == null || class_array[playerTwoResponse  - 1] == null) {
				console.log("Unexpected exception. Unable to generate selection for computer player. playerOneResponse: " 
					+ playerOneResponse + " and playerTwoResponse: " + playerTwoResponse);
			}

			// show winner
			if (playerOneResponse === 1 && playerTwoResponse == 2) {
				showMatchOverMessage(config, secondPlayer + " wins");
				secondPlayerWinCount++;
			} else if (playerOneResponse === 1 && playerTwoResponse == 3) {
				showMatchOverMessage(config, firstPlayer + " wins");
				firstPlayerWinCount++;
			} else if (playerOneResponse === 2 && playerTwoResponse == 1) {
				showMatchOverMessage(config, firstPlayer + " wins");
				firstPlayerWinCount++;
			} else if (playerOneResponse === 2 && playerTwoResponse == 3) {
				showMatchOverMessage(config, secondPlayer + " wins");
				secondPlayerWinCount++;
			} else if (playerOneResponse === 3 && playerTwoResponse == 1) {
				showMatchOverMessage(config, secondPlayer + " wins");
				secondPlayerWinCount++;
			} else if (playerOneResponse === 3 && playerTwoResponse == 2) {
				showMatchOverMessage(config, firstPlayer + " wins");
				firstPlayerWinCount++;
			} else if ((playerOneResponse > 3 || playerOneResponse < 1) && (playerTwoResponse <= 3 && playerTwoResponse >= 1)) {
				showMatchOverMessage(config, secondPlayer + " wins");
				secondPlayerWinCount++;
			} else if ((playerTwoResponse > 3 || playerTwoResponse < 1) && (playerOneResponse <= 3 && playerOneResponse >= 1)) {
				showMatchOverMessage(config, firstPlayer + " wins");
				firstPlayerWinCount++;
			} else {
				showMatchOverMessage(config, "It's a draw");
			}

			config.scoreline.score1.innerHTML = firstPlayerWinCount;
			config.scoreline.score2.innerHTML = secondPlayerWinCount;
		}
	};

	/**
	 * returns a random player from list of computerPlayers
	 * @return String
	 */
	var getComputerPlayer = function() {

		var random = Math.floor(Math.random() * 3);
		if (random !== computerPlayer) {
			computerPlayer = random;
			return computerPlayers[random];
		}

		return getComputerPlayer();
	};

	/**
	 * set the players who will play the game
	 * if the first player is also a computer 
	 * player then a random player is selected from the list
	 * @param config JSON information about player
	 *			- player: JSON with key 'name' denoting name of player. '||computer||' is reserved keyword
	 */
	var setPlayers = function(config) {
		if (config.player && config.player.name === "||computer||") {
			isFirstPlayerAComputer = true;
			firstPlayer = getComputerPlayer();
		} else {
			firstPlayer = config.player.name;
		}

		secondPlayer = getComputerPlayer();

		config.player.dom.player1.innerHTML = firstPlayer;
		config.player.dom.player2.innerHTML = secondPlayer;

		delete args.type;
	};

	/**
	 * function called when a button is clicked
	 * @param event
	 */
	var onButtonClick = function(event) {
		playerOneResponse = Number(event.target.getAttribute("data-value"));
		args.player.dom.playerSelection1.className = "selected " + class_array[Number(event.target.getAttribute("data-value")) - 1];
	};

	/**
	 * function to handle click event on the buttons
	 * @param config JSON config
	 *		expected key is "buttons"
	 */
	var setButtonListerners = function(config) {
		if (config == null || config.buttons == null) {
			return;
		}

		for (var i = 0; i < config.buttons.length; i++) {

			if (config.buttons[i].dom.addEventListener) {
				config.buttons[i].dom.addEventListener("click", function(event) {onButtonClick(event)});
			} else if (config.buttons[i].dom.attachEvent) {
				config.buttons[i].dom.attachEvent("onclick", function(event) {onButtonClick(event)});
			}
		}
	};

	/**
	 * function to reset global variables
	 */
	var resetVariables = function() {
		playerOneResponse - null;
		args.overlay.container.className = "overlay";
		clock.reset();

		
	};

	return {

		/**
		 * start a new game
		 */
		start: function() {

			clock = timer({
				maxCount: args.timer.maxCount,
				element: args.timer.element,
				onIntervalOver: {
					fn: onIntervalOverCallback,
					args: args
				}
			});

			clock.start();

			setButtonListerners(args);

			setPlayers(args);
			
		},
		/**
		 * restarts a game from 0 score
		 */
		restart: function() {

			firstPlayerWinCount = 0;
			secondPlayerWinCount = 0;

			args.scoreline.score1.innerHTML = firstPlayerWinCount;
			args.scoreline.score2.innerHTML = secondPlayerWinCount;

			resetVariables();
			clock.start();
		},
		/**
		 * continues a game from existing score line
		 */
		continue: function() {

			resetVariables();
			clock.start();
		}
	}
}
