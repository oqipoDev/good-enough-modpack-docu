function recordModData() {
	let mod = {};

	mod.id = document.getElementById("id").value;
	mod.name = document.getElementById("name").value;
	
	let authorroles = (getListData(document.getElementById("authorList"), "#authorRole"));
	let authornames = (getListData(document.getElementById("authorList"), "#authorName"));
	
	mod.authors = [];
	for(let i = 0; i < authornames.length; i++){
		mod.authors[i] = {};
		mod.authors[i].name = authornames[i];
		mod.authors[i].role = authorroles[i];
	}
	
	mod.brief = document.getElementById("brief").value;
	mod.license = document.getElementById("license").value;
	mod.description = document.getElementById("description").value;
	mod.loaders = [];
	if (document.getElementById("fabricLoader").checked)
		mod.loaders[mod.loaders.length] = 0;
	if (document.getElementById("quiltLoader").checked)
		mod.loaders[mod.loaders.length] = 1;
	if (document.getElementById("forgeLoader").checked)
		mod.loaders[mod.loaders.length] = 2;

	mod.type = (document.getElementById("type").value);
	
	mod.included = document.getElementById("included").checked;
	mod.version = document.getElementById("version").value;
	mod.linkIDs = {};
	mod.linkIDs.cf = document.getElementById("cfLink").value;
	mod.linkIDs.mr = document.getElementById("mrLink").value;
	mod.linkIDs.gh = document.getElementById("ghLink").value;
	
	mod.image = document.getElementById("imgLink").value;
	mod.website = document.getElementById("webLink").value;

	mod.categories = [];
	categs = ["performance","aesthetics",
			"gamelogic", "rendering", "gameplay",
			"features", "testing", "utility",
			"audio", "library"];

	for (let i = 0; i < categs.length; i++) {
		if (document.getElementById(`tag-${categs[i]}`).checked)
			mod.categories = mod.categories.concat(categs[i]);
	}
	
	saveObjectAsJSON(mod, mod.id, null, true);
}