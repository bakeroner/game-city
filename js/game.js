const cityNameField = document.getElementById("cityNameField");
const submitButton = document.getElementById("submitButton");
const restartButton = document.getElementById("restartButton");
const dialogLog = document.getElementById("log");
class cityWord {

	constructor () {
		this.word = cityNameField.value;
		this.score = 0;
		this.dialogArray = [];
		this.usedArray = [];
		this.answerArray = ["Питер", "Минск", "Пинск", "Краснодар", "Радужный", "Адана"];
		this.firstLetter = "";
		this.correctLastLetter = "";
	}

	validation () {
		if (this.word != "") {
			let userWord = "";
			let userLetters = "";
			let userWordFirstLetter = this.word.charAt(0).toUpperCase();
			for (let i = 1; i<this.word.length; i++) {
				userLetters = this.word.charAt(i).toLowerCase();
				if (i == this.word.length - 1) {
					if (userLetters == "ъ" || userLetters == "ь" || userLetters == " ") {
						break;
					}
					userWord += userLetters;
				}
				else {
				userWord += userLetters;
				}
			}
			this.word = userWordFirstLetter+userWord;
				return true;
		}
		else {
			return false;
		}
	}

	log () {
		this.dialogArray.push(this.word);
	}

	wordOutput () {
		let lastElement = this.dialogArray[this.dialogArray.length-1];
		let item = document.createElement("p");
		this.usedArray.push(lastElement);
		item.innerHTML = lastElement;
		dialogLog.appendChild(item);
	}

	userFirstLetter () {
		let userWord = this.word;
		let wordLength = userWord.length;
		let letter = userWord.charAt(0).toLowerCase();
		this.firstLetter = letter;
		return letter;
	}

	endOfLastWord () {
		let lastWord = this.dialogArray[this.dialogArray.length - 1];
		let wordLength = lastWord.length;
		let letter = lastWord.charAt(wordLength - 1);
		if (letter == "ъ" || letter == "ь") {
			letter = lastWord.charAt(wordLength - 2);
		}
		this.correctLastLetter = letter;
		return letter;
	}

	scoreAdd () {
		this.score++;
		console.log(this.score);
	}

	answer () {
		let answerLength = this.answerArray.length;
		let usedLength = this.usedArray.length;
		let letter = this.correctLastLetter.toUpperCase();
		let check = true;
		for (let i = 0; i<answerLength; i++) {
			if (this.answerArray[i].charAt(0) == letter) {
				for (let j = 0; j<usedLength; j++) {
					if (this.usedArray[j] == this.answerArray[i])
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
					this.dialogArray.push(this.answerArray[i]);
					break;
				}
			}
		}
		if (!check) {
				this.dialogArray.push("You won");
			}
	}

	storingInfo () {
		sessionStorage.setItem("score",this.score);
		sessionStorage.setItem("endOfLastWord",this.correctLastLetter);
		sessionStorage.setItem("usedWords", this.usedArray);
		sessionStorage.setItem("dialog", this.dialogArray);
	}

	storageInitiation () {
		let temporalDialog = [];
		let temporalUsed = [];
		let scoreCheck = sessionStorage.getItem("score");
		if (scoreCheck != null) {
		this.score = sessionStorage.getItem("score");
		this.correctLastLetter = sessionStorage.getItem("endOfLastWord");
		temporalUsed = sessionStorage.getItem("usedWords").split(",");
		this.usedArray = temporalUsed.concat();
		temporalDialog = sessionStorage.getItem("dialog").split(",");
		 this.dialogArray = temporalDialog.concat();
		 }
	}

	static storageClean () {
		sessionStorage.removeItem("score");
		sessionStorage.removeItem("endOfLastWord");
		sessionStorage.removeItem("usedWords");
		sessionStorage.removeItem("dialog");
	}
}

submitButton.addEventListener("click", function (event) {
	event.preventDefault();
	let p = new cityWord();
	p.storageInitiation();
	if (p.validation() == true) {
		if (p.correctLastLetter == "" || p.userFirstLetter() == p.endOfLastWord() ) {
			p.log();
			p.endOfLastWord();
			p.wordOutput();
			p.scoreAdd();
			p.answer();
			p.endOfLastWord();
			p.wordOutput();
			p.storingInfo();
			}
			else {
				p.dialogArray.push("Word have to start from the previous word's last letter");
				p.wordOutput();
		}
	}
	else {
			p.dialogArray.push("Wrong input");
			p.wordOutput();
		}
	
})
restartButton.addEventListener("click", function (action) {
	action.preventDefault();
	cityWord.storageClean();
})

