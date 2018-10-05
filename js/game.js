const cityNameField = document.getElementById("cityNameField");
const submitButton = document.getElementById("submitButton");
const dialogLog = document.getElementById("log");
class cityWord {

	constructor () {
		this.word = cityNameField.value;
		this.score = 0;
		this.dialogArray = [];
		this.lastLetter = "";
	}

	check () {
		console.log(this.word);
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

	lastLetter () {
		/*take last letter*/
	}

	score () {
		/*score count*/
	}

	answer () {
		/*console.log("123");*/
		this.dialogArray.push("123");	
		let item = document.createElement("p");
		item.innerHTML = this.dialogArray[this.dialogArray.length-1];;
		dialogLog.appendChild(item);	
	}
}
submitButton.addEventListener("click", function (event) {
	event.preventDefault();
	let p = new cityWord();
	if (p.check() == true) {
		p.log();
		p.wordOutput();
		p.answer();
	}

})

