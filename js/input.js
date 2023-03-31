// Text
function isInDomain(input, domain){
	const prefixes = [ "", "www.", "https://", "https://www." ];
	let startPos = null;
	for (let i = 0; i < prefixes.length; i++) {
		let check = prefixes[i] + domain;
		if (input.value.startsWith(check)){
			startPos = check.length;
			break;
		}
	}
	input.classList.remove("success");
	input.classList.remove("error");

	if (startPos == null) {
		if (input.value.includes(".com") || input.value.includes("www.") || input.value.includes("https://")){
			input.classList.add("error");
		}
		return;
	}
	let outstr = input.value.slice(startPos, input.value.length)
	input.value = outstr;
	input.classList.add("success");

	setTimeout(removeSuccess, 800, input);
}
function removeSuccess(div){
	div.classList.remove("success");
}

/**
 * Adds a list element from its child with `template` class
 * @param {Element} listDiv List container
 */
function addInputListElement(listDiv){
	let template = listDiv.getElementsByClassName("template")[0];
	
	if(template == undefined) return;
	
	let index = 0;
	while (listDiv.querySelector(`#${listDiv.id}Element${index}`) != undefined){
		index++;
	}
	let newElem = template.cloneNode(true);
	newElem.classList.remove("template");
	newElem.classList.add(listDiv.id + "Element");
	newElem.id = listDiv.id + "Element" + index;

	let deleteButton = newElem.querySelector("button.remove");
	deleteButton.setAttribute("onclick", `removeInputListElement(${listDiv.id}, ${newElem.id})`);
	
	//Optional
	let enumerator = newElem.querySelector("div.enum");
	if (enumerator != undefined) enumerator.innerHTML = index;
	
	listDiv.appendChild(newElem);
	listDiv.appendChild(listDiv.querySelector("button.add"));
}

/**
 * Removes the desired element and rearranges the remaining ones
 * @param {Element} list List container
 * @param {Element} elem List element to remove
 */
function removeInputListElement(list, elem){
	let elements = list.getElementsByClassName(list.id + "Element").length;
	
	for (let i = 0; i < elements; i++) {
		let select = list.querySelector(`#${list.id}Element${i}`);
		if(select == undefined) break;

		if (select.id == elem.id){
			index = i;
			break;
		}
	}
	
	elem.remove();

	for (let i = index; i < elements - 1; i++) {
		let current = list.querySelector(`#${list.id}Element${i + 1}`);
		current.id = `${list.id}Element${i}`;
		
		current.querySelector("div.enum").innerHTML = i;

		let deleteButton = current.querySelector("button.remove");
		deleteButton.setAttribute("onclick", `removeInputListElement(${list.id}, ${current.id})`);
	}
}

/**
 * Reads an input list element in the document and returns its values
 * @param {Element} list List Container
 * @param {String} selector (optional) selects one among multiple inputs in the list elements
 */
function getListData(list, selector){
	let data = [];
	let elements = list.getElementsByClassName(list.id + "Element").length;

	for (let i = 0; i < elements; i++) {
		let select = {};
		if (selector == undefined){
			select = list.querySelector(`#${list.id}Element${i}`);
		}
		else {
			select = list.querySelector(`#${list.id}Element${i}`).querySelector(selector);
		}

		if (select != undefined) data[i] = select.value;
	}
	return data;
}

/**
 * 
 * @param {Element} input Text input element
 * @param {Element} mimic Element that inherits from `input`
 * @param {Number} caseSwitch 0.None 1.lower 2.Title 3.camel
 * @param {Number} spacing 0.None 1.Remove 2.Hyphens
 */
function mimicTextInput(input, mimic, caseSwitch, spacing, removeSpecial)
{
	let OGstr = input.value;
	let str = "";
	let spaces = [];
	let starts = [];
	
	for (let i = 0; i < OGstr.length; i++) {
		if(OGstr[i] == ' '){
			spaces = spaces.concat(i);

			if (i + 1 != OGstr.length)
				starts = starts.concat(i + 1);
		}
	}

	let a = 0;
	switch (caseSwitch) {
		case 1:
			str = OGstr.toLowerCase();
			break;
		case 2:
			OGstr = OGstr.toLowerCase();
			str = OGstr[0].toUpperCase();
			for (let i = 1; i < OGstr.length; i++) {
				if(i == starts[a]) {
					str = str.concat(OGstr[i].toUpperCase());
					a++;
				}
				else str = str.concat(OGstr[i]);
			}
			break;
		case 3:
			OGstr = OGstr.toLowerCase();
			for (let i = 0; i < OGstr.length; i++) {
				if(i == starts[a]) {
					str = str.concat(OGstr[i].toUpperCase());
					a++;
				}
				else str = str.concat(OGstr[i]);
			}
			break;
		default: break;
		}

	switch (spacing) {
		case 1: 
			str = str.split(' ').join("");
			break;
		case 2:
			str = str.split(' ').join("-");
			break;
		default: break;
	}

	if (removeSpecial) {
		let specialChars = `\\.,/:*?<>|-@!#$%^&(){}[]'_=+`;
		for (let i = 0; i < specialChars.length; i++) {
			str = str.split(specialChars[i]).join("");
		}
	}

	mimic.value = str;
}