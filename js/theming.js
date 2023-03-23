function RestoreTheme(){
	let dark = (sessionStorage.getItem("darkTheme"));

	if (dark == undefined){
		if (window.matchMedia('(prefers-color-scheme: dark)').matches){
			document.body.classList.add("dark");
		}
	}
	
	if (dark == 1){
		document.body.classList.add("dark");
	}

	//window.matchMedia('(prefers-color-scheme: dark)').addEventListener("change", RestoreTheme());
}

function SwitchTheme(){
	let dark = (sessionStorage.getItem("darkTheme"));

	if (dark == undefined) dark = 0;

	if (dark == 1){
		document.body.classList.remove("dark");
		sessionStorage.setItem("darkTheme", 0);
	}
	else {
		document.body.classList.add("dark");
		sessionStorage.setItem("darkTheme", 1);
	}
}