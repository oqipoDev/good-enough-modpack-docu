function getMods(ids, func){
	if (!Array.isArray(ids)) return;

	const batchSize = 8;
	let idList = [...ids];

	let batches = [];

	do {
		let current = batches.length;
		batches[current] = idList.slice(batchSize * current, (batchSize * (current + 1)) );
		
	} while(idList.length > batchSize);
	
	sendModrinthRequests([], batches, func);
}

function sendModrinthRequests(data, batches, func){
	console.log(batches);
}

function getModrinthRequests(result, data, batches, func){

}