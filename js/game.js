const textInputValue = document.getElementById("cityNameField");
const submitButton = document.getElementById("submitButton");
const restartButton = document.getElementById("restartButton");
const gameHistory = document.getElementById("log");
const readyToStart = document.getElementById("readyToStart");
const gameField = document.getElementById("gameField");
let game;
class CityWord {
	constructor () {
		this.currentWord = "";
		this.correctLastLetter = "";
		this.storage = {
			score: 0,
			history: [],
			answerArray: ["Saint Petersburg", "Minsk", "Pinsk", "Krasnodar", "Gomel", "Adana"]
		}
	}
	isValid (value) {
		if (value) {
			this.currentWord = value[0].toUpperCase() + value.substr(1).toLowerCase();
			if (this.correctLastLetter === "" || this.correctLastLetter === this.currentWord[0].toLowerCase()) {
				if (this.storage.history.indexOf(this.currentWord) < 0 && this.storage.answerArray.indexOf(this.currentWord) > 0) {
					return true;
				}
				else {
					alert("This word is already used or doesn't included in word list, try again"); /*note to user*/
					return false;
				}
			}
			else {
				alert("Should start from prev letter"); /*note to user*/
				return false;
			}
		}
		else {
			alert("Wrong input"); /*note to user*/
			return false;
		}
	}
	save () {
		this.storage.history.push(this.currentWord);
		this.storage.score++;
		this.endOfLastWord(true);
	}
	endOfLastWord (playersTurn) {
		let lastWord = this.storage.history[this.storage.history.length - 1];
		this.correctLastLetter = lastWord.charAt(lastWord.length - 1);
		let item = document.createElement("p");
		if (playersTurn) {
			item.classList.add("textHighlight");
			item.innerHTML = `Player's Turn: ` + lastWord;
		}
		else {
			item.classList.add("textHighlightComputer");
			item.innerHTML = `Computer's Turn: ` + lastWord;
		}
		gameHistory.classList.remove("hideElement");
		gameHistory.appendChild(item);
	}
	answer () {
		let lastLetter = this.correctLastLetter;
        let historyArray = this.storage.history;
        this.storage.answerArray.forEach(function (elem) {
            if (elem[0].toLowerCase() === lastLetter  && historyArray.indexOf(elem) < 0) {
            	historyArray.push(elem);
            }
        });
        if (historyArray.length % 2 === 1) {
        	alert("Congratulations, you won!"); /*note to user*/
        }
        else {
        	this.endOfLastWord(false);
        }        
	}
	storageClean () {
		this.storage.score = 0;
		this.storage.history = [];
		this.currentWord = "";
		this.correctLastLetter = "";
	}
}
game = new CityWord();
readyToStart.addEventListener("click", function (event) {
	readyToStart.classList.add("hideElement");
	gameField.classList.remove("hideElement");
	game = new CityWord();
})
submitButton.addEventListener("click", function (event) {
	if (game.isValid(textInputValue.value)) {
			game.save();
			game.answer();
			console.log(game.storage.score);
			console.log(game.correctLastLetter);
			console.log(game.storage.history);
	}
})
restartButton.addEventListener("click", function (action) {
	game.storageClean();
	alert("All history is cleaned"); /*note to user*/
})
