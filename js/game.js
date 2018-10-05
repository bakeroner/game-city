const cityNameField = document.getElementById("cityNameField");
const submitButton = document.getElementById("submitButton");
const dialogLog = document.getElementById("log");
class cityWord {

	constructor () {
		this.word = cityNameField.value;
		this.score = 0;
		this.dialogArray = [];
		this.answerArray = ["Питер","Минск","Пинск","Краснодар","Кадужный"];
		this.lastLetter = "";
		this.correctLastLetter = "";
	}

	validation () {
		if (this.word != "") {
				return true;
		}
		else {
			return false;
		}
		/*check previous last letter and first of word*/
	}

	log () {
		this.dialogArray.push(this.word);
	}

	wordOutput () {
		let item = document.createElement("p");
		item.innerHTML = this.dialogArray[this.dialogArray.length-1];
		dialogLog.appendChild(item);
	}

	uesrLastLetter () {
		let wordLength = this.word.length;
		let letter = this.word.charAt(wordLength - 1);
		this.lastLetter = letter;
		return letter;
	}

	endOfLastWord () {
		let lastWord = this.dialogArray[this.dialogArray.length-1];
		let wordLength = lastWord.length;
		let letter = lastWord.charAt(wordLength - 1);
		this.correctLastLetter = letter;
		return letter;
	}

	scoreAdd () {
		this.score++;
	}

	answer () {
		let answerLength = this.answerArray.length;
		let letter = this.correctLastLetter.toUpperCase();
		for (let i=0; i<answerLength; i++) {
			if (this.answerArray[i].charAt(0) == letter) {
		this.dialogArray.push(this.answerArray[i]);
		break;
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
			console.log(p.score);
			}
			else {
				console.log("Wrong input");
		}
	}
})

