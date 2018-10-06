const cityNameField = document.getElementById("cityNameField");
const submitButton = document.getElementById("submitButton");
const dialogLog = document.getElementById("log");
class cityWord {

	constructor () {
		this.word = cityNameField.value;
		this.score = 0;
		this.dialogArray = [];
		this.usedArray = [];
		this.answerArray = ["Питер", "Минск", "Пинск", "Краснодар", "Радужный", "Адана"];
		this.lastLetter = "";
		this.correctLastLetter = "";
	}

	validation () {
		if (this.word != "") {
			let userWord = "";
			let userLetters = "";
			let userWordFirstLetter = this.word.charAt(0).toUpperCase();
			for (let i = 1; i<this.word.length; i++) {
				userLetters = this.word.charAt(i).toLowerCase();
				userWord += userLetters;
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

	userLastLetter () {
		let userWord = this.word;
		let wordLength = userWord.length;
		let letter = userWord.charAt(wordLength - 1);
		if (letter == "ъ" || letter == "ь") {
			letter = userWord.charAt(wordLength - 2);
		}
		this.lastLetter = letter;
		return letter;
	}

	endOfLastWord () {
		let lastWord = this.dialogArray[this.dialogArray.length-1];
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
			else {
				this.dialogArray.push("You won");
			}
		}
	}
}

submitButton.addEventListener("click", function (event) {
	event.preventDefault();
	let p = new cityWord();
	if (p.validation() == true) {
		if (p.correctLastLetter == "" || p.userLastLetter() == p.endOfLastWord()) {
			p.log();
			p.endOfLastWord();
			p.wordOutput();
			p.scoreAdd();
			p.answer();
			p.endOfLastWord();
			p.wordOutput();
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

