const WebSocket = require ('ws');
const MusicTicker = require ('./musicTicker');

const ws = new WebSocket('ws://localhost:5672');
const ticker = new MusicTicker();

ws.on('open', function open() {
	console.log('Opened websocket connection.');
	setInterval(ticker.updateTicker.bind(ticker), 1000);
});

ws.on('message', function incoming(data) {
	data = JSON.parse(data);

	if (data.channel === "track") {
		ticker.title = data.payload.title;
		ticker.artist = data.payload.artist;
		ticker.album = data.payload.album;
	} else if (data.channel === "playState") {
		ticker.playing = data.payload;
	} /*else if (data.channel === "lyrics") {
		console.log(data.payload);
	}*/
});