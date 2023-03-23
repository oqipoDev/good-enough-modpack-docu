
/**
 * Transforms camelCase text to human-friendly Display Text
 * @param {string} string Text to transform 
 * @returns string
 */
 function camelToDisplay(string){
	let newString = string[0].toUpperCase();

	for(let i = 1; i < string.length; i++){
		// Respect multiple uppercase letters
		if (string[i] == string[i].toUpperCase() && string[i-1] != string[i-1].toUpperCase()){
			newString += " ";
		}
		newString +=string[i];
	}
	return newString;
}

/**
 * Returns a human-readable JSON string
 * @param {string} str JSON string 
 * @returns string
 */
function prettifyJSON(str){
	function newline(){
		// Prevent multiple newlines
		if (result[result.length - 1] == '\n') {
			return;
		}
		
		result += '\n';
		
		// Indentation
		for (let i = 0; i < level; i++) {
			result += '\t';
		}
	}
	let level = 0;
	let result = "";
	for(let i = 0; i < str.length; i++){
		// Scope in
		if (str[i] == '{' || str[i] == '['){
			level++;
			result += str[i];
			newline();
		}
		// Scope out
		else if (str[i] == '}' || str[i] == ']'){
			level--;
			newline();
			result += str[i];
		}
		// Additional spacing
		else if (str[i] == ',' ||
		(str[i - 1] == '"' && str[i] == ':' && (str[i + 1] == '{' || str[i + 1] == '['))){
			result += str[i];
			newline();
		}
		else{
			result += str[i];
		}
	}
	
	return result;
}

/**
 * Sets a download button for an object as a JSON file.
 * Set `button` param to `false` to download automatically.
 * @param {Object} obj Object to convert to JSON
 * @param {String} name Name of file, no extension
 * @param {Element} button _(optional)_ Download link or button
 * @param {Boolean} prettify Format with line breaks and indentations.
 */
function saveObjectAsJSON(obj, name, button, prettify){
	// Create data
	let rawStr = JSON.stringify(obj);
	if (prettify) rawStr = prettifyJSON(rawStr);

	let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(rawStr);

	let docLink = null;
	// Atach data to link
	if (button == null || button == undefined) docLink = document.createElement('a');
	else docLink = button;

	docLink.setAttribute("href", dataStr);
	docLink.setAttribute('download', name + '.json');
	
	if (button == null || button == undefined) {
		document.body.appendChild(docLink);
		//Automatically download
		docLink.click();
		document.body.removeChild(docLink);
	}
}