const cityNameField = document.getElementById("cityNameField");
const submitButton = document.getElementById("submitButton");
const restartButton = document.getElementById("restartButton");
const warning = document.getElementById("warningField");
const dialogLog = document.getElementById("log");
class cityWord {

	constructor (word) {
		this.word = word;
		this.score = 0;
		this.dialogArray = [];
		this.usedArray = [];
		this.answerArray = ["Saint Petersburg", "Minsk", "Pinsk", "Krasnodar", "Gomel", "Adana"];
		this.correctLastLetter = "";
	}

	validation () {
		if (this.word !== "") {
			if (this.correctLastLetter === "" || this.userFirstLetter() === true) {
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
		this.dialogArray.push(this.word);
		this.score++;
		console.log(this.score);
		this.endOfLastWord();
	}

	userFirstLetter () {
		let userWord = this.word;
		let wordLength = userWord.length;
		let letter = userWord.charAt(0).toLowerCase();
		if (letter === this.correctLastLetter) {
			return true;
		}
		
	}

	endOfLastWord () {
		let lastWord = this.dialogArray[this.dialogArray.length - 1];
		let wordLength = lastWord.length;
		let letter = lastWord.charAt(wordLength - 1);
		this.correctLastLetter = letter;

		let item = document.createElement("p");
		this.usedArray.push(lastWord);
		item.innerHTML = lastWord;
		dialogLog.appendChild(item);
		return letter;
	}

	answer () {
		let answerLength = this.answerArray.length;
		let usedLength = this.usedArray.length;
		let letter = this.correctLastLetter.toUpperCase();
		let check = true;
		for (let i = 0; i<answerLength; i++) {
			if (this.answerArray[i].charAt(0) === letter) {
				for (let j = 0; j<usedLength; j++) {
					if (this.usedArray[j] === this.answerArray[i])
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
			this.endOfLastWord();
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

}
function storageClean () {
	sessionStorage.clear();
}

/*function warningToVisible (warningText) {
		let item = document.createElement("p");
		item.innerHTML = warningText;
		warning.appendChild(item);
		warning.classList.toggle("hideElement");
}
function warningClean () {
	let warningChild = warning.firstChild;
	if (warningChild) {
		warning.removeСhild(warningChild);
		warning.classList.toggle("hideElement");
	}
}*/

submitButton.addEventListener("click", function (event) {
	event.preventDefault();
	let fieldValue = cityNameField.value;
	let p = new cityWord(fieldValue);
	p.storageInitiation();
	if (p.validation() === true) {
			p.log();
//			p.endOfLastWord(); running from p.log
			p.answer();
//			p.endOfLastWord(); running from p.answer
			p.storingInfo();
			}
	
})
restartButton.addEventListener("click", function (action) {
	action.preventDefault();
	storageClean();
})