// Your code goes here.

function GetUrlParms() {
    /// Parses the URL for parameters and returns an array of key-value pairs
    // URL parameters begin after the '?' in the URL.
    var startLocation = window.location.href.indexOf('?');
    // We may not have any URL parameters.
    if (startLocation === -1) {
        return null;
    }
    // We do not care about the location part of the URL.
    var parmString = window.location.href.slice(startLocation + 1);
    // Each key/value pair is separated by an '&'.
    var varStrings = parmString.split('&');
    // We need to iterate over each key/value string.
    var l = varStrings.length;
    var variables = {};
    for (var i = 0; i < l; i += 1) {
        // Key/value strings have the form: key=value
        var tmp = varStrings[i].split('=');
        // We need to unescape the strings because they be encoded as follows:
        // "hello world" -> hello+world
        // or certain charactes are encoded as their ascii value: %20 %da
        // We also convert the key to lower case so the program can always
        // access via the lower case key.
        variables[decodeURIComponent(tmp[0]).toLowerCase()] = decodeURIComponent(tmp[1]);
    }
    return variables;
}

// -----------------------------------------------------------------------------
// ------------------------------------------------------------------- Timing -
function createTimeQueue() {
    var timer = {};
    timer.functions = [];
    timer.delays = [];
    timer.pushEvent = function (func, delay) {
        timer.functions.push(func);
        timer.delays.push(delay);
    };
    timer.process = function () {
        if (timer.functions.length > 0) {
            var func = timer.functions.shift();
            var delay = timer.delays.shift();
            func();
            setTimeout(timer.process, delay);
        } else {
            timer.functions = [];
            timer.delays = [];
        }
    };
    return timer;
}

// -----------------------------------------------------------------------------
// ----------------------------------------------------- Array Mainupulations -
function isElementInArray(element, arr) {
/// Returns 1 if element is in arr, 0 otherwise.
    var i = arr.length;
    while (i--) {
        if (arr[i] === element) {
            return 1;
        }
    }
    return 0;
}
function getRandomElementFrom(list) {
/// Returns a random element from list.
    return list[Math.floor(Math.random() * list.length)];
}
function shuffleArray(arr) {
/// Sorts arr in a random order (in place ie doesn't return anything).
    var nElements = arr.length,
        nSwaps = 1 + Math.floor(nElements / 2),
        p1, p2, swap;
    while (nSwaps--) {
        p1 = Math.floor(nElements * Math.random());
        p2 = Math.floor(nElements * Math.random());
        swap = arr[p1];
        arr[p1] = arr[p2];
        arr[p2] = swap;
    }
}

// -----------------------------------------------------------------------------
// --------------------------------------------------------- Dom Manipulation -
function addClass(dom, className) {
    //dom.className += " " + className;
    dom.setAttribute('class', dom.getAttribute('class')+' '+className);
}

function removeClass(dom, className) {
    //dom.className = dom.className.replace(className, '');
    var oldClass = dom.getAttribute('class');
    var newClass = oldClass.replace(new RegExp('\\b' + className + '\\b','g'),'');
    if( newClass !== oldClass ){
        dom.setAttribute('class',newClass);
    }
}

function getViewportSizes() {
    /// Returns the viewport size: [width,height]
    var viewPortWidth;
    var viewPortHeight;

    // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth !== 'undefined') {
        viewPortWidth = window.innerWidth;
        viewPortHeight = window.innerHeight;
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement !== 'undefined' && typeof document.documentElement.clientWidth !== 'undefined' && document.documentElement.clientWidth !== 0) {
        viewPortWidth = document.documentElement.clientWidth;
        viewPortHeight = document.documentElement.clientHeight;
    }

    // older versions of IE
    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
        viewPortHeight = document.getElementsByTagName('body')[0].clientHeight;
    }
    return [viewPortWidth, viewPortHeight];
}

function resizeToMax(divContainer) {
    var viewportSizes = getViewportSizes();
    //var divContainer = document.getElementById("game-content");

    // if we can fit everything in the current with
    //if( viewportSizes[0]*aspectPercent/100 < viewportSizes[1] ){
    // I have to set the line height so that things are vertically centered
    // in different configurations. For vertical centering:
    // lineHeight = height = fontSize, but I set the font size based on the
    // smaller dimension (width or height). I set the height to a specific 
    // percent. I need to set the line height such that:
    // lineHeight * fontSize === height. This vertically centers stuff.
    if (viewportSizes[0] < viewportSizes[1]) {
        divContainer.style.width = viewportSizes[0] + "px";
        divContainer.style.height = viewportSizes[1] + "px";
        divContainer.style.fontSize = viewportSizes[0] + "px";
	divContainer.style.lineHeight = viewportSizes[1]/viewportSizes[0];
        divContainer.className = "vertical";
    } else {
        divContainer.style.width = viewportSizes[0] + "px";
        divContainer.style.height = viewportSizes[1] + "px";
        divContainer.style.fontSize = viewportSizes[1] + "px";
	divContainer.style.lineHeight = 1;
        divContainer.className = "horizontal";
    }
}
function loadScript(url, onLoad){
    var script = document.createElement("script");
    script.type = "text/javascript";
    // Internet explorer
    if (script.readyState){
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                onLoad();
            }
        };
    // Others
    } else {
        script.onload = function(){
            onLoad();
        };
    }
    // Set the src after enabling the callback; otherwise, race condition
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
// -----------------------------------------------------------------------------
// ----------------------------------------------------- Internationalization -
function getClosestLanguageCode(code){
	var valids = ["en-us","af","ar","be","bg","ca","cs-cz","da-dk","de-de","el-gr","en-us","es-es","es-us","et","fa","fi-fi","fil","fr-fr","hi-in","hr","hu-hu","it-it","iw-il","ja-jp","ko-kr","lt","lv","ms","nl-nl","no-no","pl-pl","pt-br","pt-pt","ro","ru-ru","sk","sl","sr","sv-se","sw","th","tr-tr","uk","vi","zh-cn","zh-tw"];
	var i = valids.length;
	var lowerCode = code.toLowerCase();
	while( i-- ){
		if( valids[i] === lowerCode ){
			return valids[i];
		}
	}
	// return default:
	return valids[0];
}
// Hopefully my data saving library has loaded before this is called
function loadTranslation(langDir,onLoad) {
    var language = data.loadValid('lang', 'NONE', data.any);
    if (language === 'NONE') {
        language = window.navigator.userLanguage || window.navigator.language;
	language = language.toLowerCase();
    }
    language = getClosestLanguageCode(language);
    loadScript(langDir + language + ".js", onLoad);
}

// -----------------------------------------------------------------------------
// ------------------------------------------------------------ Game Specific -
function setupTransitions(timer, time, transitions, action) {
    // fade everything out:
    timer.pushEvent(function () {addClass(document.getElementById('choice-4'), transitions[4]);}, time);
    timer.pushEvent(function () {addClass(document.getElementById('choice-3'), transitions[3]);}, time);
    timer.pushEvent(function () {addClass(document.getElementById('choice-2'), transitions[2]);}, time);
    timer.pushEvent(function () {addClass(document.getElementById('choice-1'), transitions[1]);}, time);
    timer.pushEvent(function () {addClass(document.getElementById('question'), transitions[0]);}, time);

    // change everything
    timer.pushEvent(function () {
        document.getElementById('choice-4').className = "answer transition " + transitions[4];
        document.getElementById('choice-3').className = "answer transition " + transitions[3];
        document.getElementById('choice-2').className = "answer transition " + transitions[2];
        document.getElementById('choice-1').className = "answer transition " + transitions[1];
        document.getElementById('question').className = "question transition " + transitions[0];
        // makeQuestion(100,999);
        action();
    }, time / 2);

    // fade everything back in
    timer.pushEvent(function () {removeClass(document.getElementById('question'), transitions[0]);}, time);
    timer.pushEvent(function () {removeClass(document.getElementById('choice-1'), transitions[1]);}, time);
    timer.pushEvent(function () {removeClass(document.getElementById('choice-2'), transitions[2]);}, time);
    timer.pushEvent(function () {removeClass(document.getElementById('choice-3'), transitions[3]);}, time);
    timer.pushEvent(function () {removeClass(document.getElementById('choice-4'), transitions[4]);}, time);

    // run it
    timer.process();
}
function setupStatTransitions(timer, time, transitions, action) {
    // fade everything out:
    timer.pushEvent(function () {addClass(document.getElementById('choice-4'), transitions[4]);}, time);
    timer.pushEvent(function () {addClass(document.getElementById('choice-3'), transitions[3]);}, time);
    timer.pushEvent(function () {addClass(document.getElementById('choice-2'), transitions[2]);}, time);
    timer.pushEvent(function () {addClass(document.getElementById('choice-1'), transitions[1]);}, time);
    timer.pushEvent(function () {addClass(document.getElementById('question'), transitions[0]);}, time);

    // change everything
    timer.pushEvent(function () {
        document.getElementById('choice-4').className = "answer transition " + transitions[4];
        document.getElementById('choice-3').className = "answer transition " + transitions[3];
        document.getElementById('choice-2').className = "answer transition incorrect " + transitions[2];
        document.getElementById('choice-1').className = "answer transition correct " + transitions[1];
        document.getElementById('question').className = "question transition " + transitions[0];
        // makeQuestion(100,999);
        action();
    }, time / 2);

    // fade everything back in
    timer.pushEvent(function () {removeClass(document.getElementById('question'), transitions[0]);}, time);
    timer.pushEvent(function () {removeClass(document.getElementById('choice-1'), transitions[1]);}, time);
    timer.pushEvent(function () {removeClass(document.getElementById('choice-2'), transitions[2]);}, time);
    timer.pushEvent(function () {removeClass(document.getElementById('choice-3'), transitions[3]);}, time);
    timer.pushEvent(function () {removeClass(document.getElementById('choice-4'), transitions[4]);}, time);
    // run it
    timer.process();
}
function setupLink(node,text,href){
	var anchor = '<span class="link">'+text+'</span>';
	node.innerHTML = anchor;
	node.onclick = function(){
		window.location.href = href;
	};
}
function setupButton(node,text,onclick){
	var anchor = '<span class="link">'+text+'</span>';
	node.innerHTML = anchor;
	node.onclick = onclick;
}
// --------------------------------------------------------- External Sources -
// -----------------------------------------------------------------------------
// -------------------------------------------- From: http://underscorejs.org -
makeDebounced = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };