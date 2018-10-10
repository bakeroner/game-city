const cityNameField = document.getElementById("cityNameField");
const submitButton = document.getElementById("submitButton");
const restartButton = document.getElementById("restartButton");
const dialogLog = document.getElementById("log");
class cityWord {

	constructor () {

	this.storage = {
	word: "",
	score: 0,
	dialogArray: [],
	answerArray: ["Saint Petersburg", "Minsk", "Pinsk", "Krasnodar", "Gomel", "Adana"],
	correctLastLetter: ""
	}

	}

	isValid (value) {
		if (value !== "") {
			if (this.storage.correctLastLetter === "" || this.userFirstLetter() === true) {
				let userWord = "";
				let userLetters = "";
				let userWordFirstLetter = this.storage.word.charAt(0).toUpperCase();
				for (let i = 1; i<this.storage.word.length; i++) {
					userLetters = this.storage.word.charAt(i).toLowerCase();
						userWord += userLetters;
				}
				this.storage.word = userWordFirstLetter+userWord;
					return true;
			}
			else {
					alert("Should start from prev letter");
				/*note to user*/
				return false;
			}
		}
		else {
					alert("Wrong input");
			/*note to user*/
			return false;
		}
	}

	log () {
		this.storage.dialogArray.push(this.storage.word);
		this.storage.score++;
		this.endOfLastWord();
	}

	userFirstLetter () {
		let userWord = this.storage.word;
		let wordLength = userWord.length;
		let letter = userWord.charAt(0).toLowerCase();
		if (letter === this.storage.correctLastLetter) {
			return true;
		}
		
	}

	endOfLastWord () {
		let lastWord = this.storage.dialogArray[this.storage.dialogArray.length - 1];
		let wordLength = lastWord.length;
		let letter = lastWord.charAt(wordLength - 1);
		this.storage.correctLastLetter = letter;

/*		let item = document.createElement("p");
		item.innerHTML = lastWord;
		dialogLog.appendChild(item);*/
		console.log(lastWord);
		return letter;
	}

	answer () {
		let answerLength = this.storage.answerArray.length;
		let usedLength = this.storage.dialogArray.length;
		let letter = this.storage.correctLastLetter.toUpperCase();
		let check = true;
		for (let i = 0; i<answerLength; i++) {
			if (this.storage.answerArray[i].charAt(0) === letter) {
				for (let j = 0; j<usedLength; j++) {
					if (this.storage.dialogArray[j] === this.storage.answerArray[i])
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
					this.storage.dialogArray.push(this.storage.answerArray[i]);
					break;
				}
			}
		}
		if (!check) {
				alert("You won");
				/*note to user*/
			}
			this.endOfLastWord();
	}
}

function storageClean () {
	this.storage.word = "";
	this.storage.score = 0;
	this.storage.dialogArray = [];
	this.storage.correctLastLetter = "";
	}


let p = new cityWord();


submitButton.addEventListener("click", function (event) {
	event.preventDefault();
	
	let fieldValue = cityNameField.value;
	p.storage.word = fieldValue;
	if (p.isValid(p.storage.word) === true) {
			p.log();
			p.answer();
			console.log(p.storage.score);
			console.log(p.storage.correctLastLetter);
			console.log(p.storage.dialogArray);
			}
})

restartButton.addEventListener("click", function (action) {
	action.preventDefault();
	p.storageClean();
})


const cityNameField1 = document.getElementById("cityNameField1");
const submitButton1 = document.getElementById("submitButton1");
const restartButton1 = document.getElementById("restartButton1");

submitButton1.addEventListener("click", function (event) {
	event.preventDefault();
	fieldValue = cityNameField1.value;
	p.storage.word = fieldValue;
	if (p.isValid(p.storage.word) === true) {
			p.log();
			p.answer();
			console.log(p.storage.score);
			console.log(p.storage.correctLastLetter);
			console.log(p.storage.dialogArray);
			}
})

restartButton1.addEventListener("click", function (action) {
	action.preventDefault();
	p.storageClean();
})