(() => {
$(document).foundation()

	//variable stack goes at top
	vid = document.getElementById("my_video");
	playbtn = document.getElementById("playpausebtn");
	seekslider = document.getElementById("seekslider");	
	durtimetext = document.getElementById("durtimetext");
	mutebtn = document.getElementById("mutebtn");
	volumeslider = document.getElementById("volumeslider");
	fullscreenbtn = document.getElementById("fullscreenbtn");
	playbtn.addEventListener("click",playPause,false);
	seekslider.addEventListener("change",vidSeek,false);
	vid.addEventListener("timeupdate",seektimeupdate,false);
	mutebtn.addEventListener("click",vidmute,false);
	volumeslider.addEventListener("change",setvolume,false);
	fullscreenbtn.addEventListener("click",toggleFullScreen,false);

	//random generator
	$('.random_gen').click(function() {
    $('.name').text(randomEl(adjectives)+' '+randomEl(nouns));
    selectElementContents($('.name')[0]);
});
	function randomEl(list) {
    var i = Math.floor(Math.random() * list.length);
    return list[i];
}
	function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}
	//variables of possible name combinations
	var adjectives = ["Spacey", "Galaxier", "Stary", "Orbitless", "Star-Crusher", "Flappy", "Barglar", "I-Just-want-to-sleep"];
	var nouns = ["Meatboi", "Walrus", "Bigboi", "Jim", "Bobby", "John"];

	$('random_gen').click();

	//custom video player controls
	var vid, playbtn, seekslider, durtimetext, mutebtn, volumeslider, fullscreenbtn;
	function intializePlayer(){	
}
	window.onload = intializePlayer;
	function playPause(){
	if(vid.paused){
		vid.play();
	} else {
		vid.pause();
	}
}
	function vidSeek(){
	var seekto = vid.duration * (seekslider.value / 100);
	vid.currentTime = seekto;
}
	function seektimeupdate(){
	var nt = vid.currentTime * (100 / vid.duration);
	seekslider.value = nt;
	var durmins = Math.floor(vid.duration / 60);
	var dursecs = Math.floor(vid.duration - durmins * 60);
	if(dursecs < 10){ dursecs = "0"+dursecs; }
	if(durmins < 10){ durmins = "0"+durmins; }
	durtimetext.innerHTML = durmins+":"+dursecs;
}
	function vidmute(){
	if(vid.muted){
		vid.muted = false;
		mutebtn.innerHTML = "Mute";
	} else {
		vid.muted = true;
		mutebtn.innerHTML = "Unmute";
	}
}
	function setvolume(){
	vid.volume = volumeslider.value / 100;
}
	function toggleFullScreen(){
	if(vid.requestFullScreen){
		vid.requestFullScreen();
	} else if(vid.webkitRequestFullScreen){
		vid.webkitRequestFullScreen();
	} else if(vid.mozRequestFullScreen){
		vid.mozRequestFullScreen();
	}
}
})();