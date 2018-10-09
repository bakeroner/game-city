const cityNameField = document.getElementById("cityNameField");
const submitButton = document.getElementById("submitButton");
const restartButton = document.getElementById("restartButton");
const warning = document.getElementById("warningField");
const dialogLog = document.getElementById("log");
class cityWord {

	constructor () {
//		this.word = "";
	}

	validation () {
		if (storage.word !== "") {
			if (storage.correctLastLetter === "" || this.userFirstLetter() === true) {
				let userWord = "";
				let userLetters = "";
				let userWordFirstLetter = storage.word.charAt(0).toUpperCase();
				for (let i = 1; i<storage.word.length; i++) {
					userLetters = storage.word.charAt(i).toLowerCase();
						userWord += userLetters;
				}
				storage.word = userWordFirstLetter+userWord;
					return true;
			}
			else {
					alert("Should start from prev letter");
				/*note to user*/
				return false;
			}
		}
		else {
					alert("Should start from prev letter");
			/*note to user*/
			return false;
		}
	}

	log () {
		storage.dialogArray.push(storage.word);
		storage.score++;
		this.endOfLastWord();
	}

	userFirstLetter () {
		let userWord = storage.word;
		let wordLength = userWord.length;
		let letter = userWord.charAt(0).toLowerCase();
		if (letter === storage.correctLastLetter) {
			return true;
		}
		
	}

	endOfLastWord () {
		let lastWord = storage.dialogArray[storage.dialogArray.length - 1];
		let wordLength = lastWord.length;
		let letter = lastWord.charAt(wordLength - 1);
		storage.correctLastLetter = letter;

		let item = document.createElement("p");
		storage.usedArray.push(lastWord);
		item.innerHTML = lastWord;
		dialogLog.appendChild(item);
		return letter;
	}

	answer () {
		let answerLength = storage.answerArray.length;
		let usedLength = storage.usedArray.length;
		let letter = storage.correctLastLetter.toUpperCase();
		let check = true;
		for (let i = 0; i<answerLength; i++) {
			if (storage.answerArray[i].charAt(0) === letter) {
				for (let j = 0; j<usedLength; j++) {
					if (storage.usedArray[j] === storage.answerArray[i])
					{
						i++;
						check = false;
						break;
					}
					else {
						check = true;
					}
				}
				if (check) {
					storage.dialogArray.push(storage.answerArray[i]);
					break;
				}
			}
		}
		if (!check) {
				alert("You won");
			}
			this.endOfLastWord();
	}
}

let storage = {
	word: "",
	score: 0,
	dialogArray: [],
	answerArray: ["Saint Petersburg", "Minsk", "Pinsk", "Krasnodar", "Gomel", "Adana"],
	usedArray: [],
	correctLastLetter: ""
};
	let p = new cityWord();

submitButton.addEventListener("click", function (event) {
	event.preventDefault();
	fieldValue = cityNameField.value;
	storage.word = fieldValue;
	if (p.validation() === true) {
			p.log();
			p.answer();
			console.log(storage.score);
			console.log(storage.correctLastLetter);
			console.log(storage.usedArray);
			console.log(storage.dialogArray);
			}
})

restartButton.addEventListener("click", function (action) {
	action.preventDefault();
//	storageClean();
})