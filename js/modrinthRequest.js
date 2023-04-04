const MCVer = "1.19.2";
const Loader = "fabric";

function getMods(ids, func){
	if (!Array.isArray(ids)) return;

	fetch(`https://api.modrinth.com/v2/projects?ids=${JSON.stringify(ids)}`)
		.then((e) => e.json()).then((e) => window[func.name](e));
}