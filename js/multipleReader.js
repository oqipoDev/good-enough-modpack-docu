let fileListData = [];

async function readFilesFrom(file, prefix, suffix, func){
	let fileList = [];
	fileListData = [];

	fetch(file)
		.then((e) => e.json())
		.then((e) => {
			fileList = e;
			if (prefix == undefined) { prefix = ""};
			if (suffix == undefined) { suffix = ""};
			
			for (let i = 0; i < fileList.length; i++) {
				fileList[i] = prefix + fileList[i] + suffix;
			}
			sendTextReader(fileList, 0, func);
		});
}

async function readFiles(list, prefix, suffix, func){
	let urlList = [];
	fileListData = [];

	if (prefix == undefined) { prefix = ""};
	if (suffix == undefined) { suffix = ""};
	
	for (let i = 0; i < list.length; i++) {
		urlList[i] = prefix + list[i] + suffix;
	}
	sendTextReader(urlList, 0, func);
}

function sendTextReader(fileList, i, func){
	if(i < fileList.length){
		fetch(fileList[i])
			.then((e) => e.json())
			.then((e) => {
				fileListData[fileListData.length] = e;
				sendTextReader(fileList, i + 1, func);
			});
	}
	else finishReading(func);
}

function finishReading(func){
	window[func.name](fileListData);
}