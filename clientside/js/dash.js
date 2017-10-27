var websock;
var tmp = ['F',73];
window.incomingMessage;
window.consout = "";
window.statsOn = ['stat0','stat1'];
window.devices = [['js/img/lampoff.png','js/img/lampon.png'],['js/img/fanoff.png','js/img/fanon.png']];
	
function connect() {
	websock = new WebSocket("ws://192.168.7.2:1880/dash");
	websock.onopen = onOpen;
	websock.onclose = onClose;
	websock.onmessage = onMessage;
	websock.onerror = onError;
} function onOpen(evt) {
	consout += "Opened socket<br />";
	printConsole();
	getStat();
} function onClose(evt) {
	consout += "Closed socket<br />";
	printConsole();
} function onMessage(evt) {
	consout += "Message received<br />";
	printConsole();
	updateStat(evt.data);
} function onError(evt) {
	consout += "Whooops..<br />";
	printConsole();
}

function getStat() {
	websock.send(statsOn);
} function updateStat(statStr) {
	var statUpdate = statStr.split(':');
	var devid = statUpdate[0];
	var devst = statUpdate[1];
	var devimg = devices[devid];
	document.getElementById("img"+devid).src = devimg[devst];
}

function toggleTmp(){
	var type = tmp[0];
	var temp = tmp[1]
	if (type=='F') {
		tmp[0]='C';
		tmp[1]=(temp-32)*(5/9);
		document.getElementById("tmpType").src = "js/img/tmpC.png";
	} else {
		tmp[0]='F';
		tmp[1]=(temp*1.8)+32;
		document.getElementById("tmpType").src = "js/img/tmpF.png";
	}
	document.getElementById("tmpVal").innerHTML = parseFloat(tmp[1]).toFixed(1);
}
function sendCMD(command) {
	var cmd = 'cmd' + command;
	websock.send(cmd);
}

function browserValidate() {
	if ("WebSocket" in window) {
		consout += "Browser supported<br />";
		printConsole();
		connect();
	} else {
		consout += "Browser doesn't support HTML5 WebSockets<br />";
		printConsole();;
	}
}

function printConsole() {
}