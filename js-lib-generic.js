function getViewportSizes() {

	var viewPortWidth;
	var viewPortHeight;

	// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
	if (typeof window.innerWidth != 'undefined') {
		viewPortWidth = window.innerWidth,
		viewPortHeight = window.innerHeight
	}

	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	else if (typeof document.documentElement != 'undefined'
	&& typeof document.documentElement.clientWidth != 'undefined'
	&& document.documentElement.clientWidth != 0) {
		viewPortWidth = document.documentElement.clientWidth,
		viewPortHeight = document.documentElement.clientHeight
	}

	// older versions of IE
	else {
		viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
		viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
	}
	return [viewPortWidth, viewPortHeight];
}
function resizeWindow(aspectPercent){
	var viewportSizes = getViewportSizes();
	var divContainer = document.getElementById("game-content");

	// if we can fit everything in the current with
	//if( viewportSizes[0]*aspectPercent/100 < viewportSizes[1] ){
	if( viewportSizes[0] < viewportSizes[1] ){
		divContainer.style.width = viewportSizes[0]+"px";
		divContainer.style.height = viewportSizes[1]+"px";
		divContainer.style.fontSize = viewportSizes[1]+"px";
		divContainer.className = "vertical";
	}else{
		divContainer.style.width = viewportSizes[0]+"px";
		divContainer.style.height = viewportSizes[1]+"px";
		divContainer.style.fontSize = viewportSizes[1]+"px";
		divContainer.className = "horizontal";
	}
}
function GetUrlParms(){
	/// Parses the URL for parameters and returns an array of key-value pairs
	// URL parameters begin after the '?' in the URL.
	var startLocation = window.location.href.indexOf('?');
	// We may not have any URL parameters.
	if( startLocation == -1 ){ return null; }
	// We do not care about the location part of the URL.
	var parmString = window.location.href.slice(startLocation + 1);
	// Each key/value pair is separated by an '&'.
	var varStrings = parmString.split('&');
	// We need to iterate over each key/value string.
	var l = varStrings.length;
	var variables = {};
	for(var i=0; i<l; i+=1){
		// Key/value strings have the form: key=value
		var tmp = varStrings[i].split('=');
		// We need to unescape the strings because they be encoded as follows:
		// "hello world" -> hello+world
		// or certain charactes are encoded as their ascii value: %20 %da
		// We also convert the key to lower case so the program can always
		// access via the lower case key.
		variables[unescape(tmp[0]).toLowerCase()] = unescape(tmp[1]);
	}
	return variables;
}
function createTimeQueue(){
	var timer = {};
	timer.functions = [];
	timer.delays = [];
	timer.pushEvent = function( func, delay ){
		timer.functions.push(func);
		timer.delays.push(delay);
	};
	timer.process = function(){
		if( timer.functions.length > 0 ){
			var func = timer.functions.shift();
			var delay = timer.delays.shift();
			func();
			setTimeout(timer.process,delay);
		}else{
			timer.functions = [];
			timer.delays = [];
		}
	};
	return timer;
}

function isElementInArray(element,arr){
	var i = arr.length;
	while( i-- ){
		if( arr[i] === element ){ return 1; }
	}
	return 0;
}
function getRandomElementFrom(list){
	return list[Math.floor(Math.random()*list.length)];
}
function shuffleArray(arr){
	var nElements = arr.length,
	    nSwaps = 1+Math.floor(nElements / 2),
	    p1, p2, swap;
	while( nSwaps-- ){
		p1 = Math.floor(nElements*Math.random());
		p2 = Math.floor(nElements*Math.random());
		swap = arr[p1];
		arr[p1] = arr[p2];
		arr[p2] = swap;
	}
}

function addClass(dom,className){
	dom.className += " "+className;
}
function removeClass(dom,className){
	dom.className = dom.className.replace(className,'');
}

// Hopefully my data saving library has loaded before this is called
function loadTranslation(){
	var language = data.loadValid('lang','NONE',data.any);
	if( language === 'NONE' ){
		language = window.navigator.userLanguage || window.navigator.language;
	}
	// language = 'es'; // FOR TESTING ONLY !!! !!! !!! !!! !!!
	var reLangs = {
		es: /es/gi,
		en: /en/gi
	}
	var lang;
	for( lang in reLangs ){
		if( reLangs[lang].test(language) ){
			// Load that language
			var newScript = document.createElement('script');
			newScript.type = "text/javascript";
			newScript.src = "lang/"+lang+".js";
			document.body.appendChild(newScript);
			// add an onload callback to the script...
			// or just let it put stuff in the global namespace
		}
	}
}