require('dotenv').config();

const fs = require('fs');

class MusicTicker {
	constructor() {
		this._playing = false;
		this._title = "";
		this._artist = "";
		this._album = "";
		this.changed = false;
	}

	set playing(value) {
		if (value !== this._playing) {
			this.changed = true;
			this._playing = value;
		}
	}
	set title(value) {
		if (value !== this._title) {
			this.changed = true;
			this._title = value;
		}
	}
	set artist(value) {
		if (value !== this._artist) {
			this.changed = true;
			this._artist = value;
		}
	}
	set album(value) {
		if (value !== this._album) {
			this.changed = true;
			this._album = value;
		}
	}

	updateTicker() {
		if (this.changed) {
			if (!this._playing) {
				let output = process.env.PAUSED_OUTPUT

				if (process.env.EXTRA_SPACES > 0) {
					for (let i = 1; i <= process.env.EXTRA_SPACES; i++) {
						output += " ";
					}
				} else if (process.env.EXTRA_SPACES < 0) {
					output = output.substr(0, (output.length + parseInt(process.env.EXTRA_SPACES)));
				}

				fs.writeFile(process.env.FILE_LOCATION, output, (err) => {
					if (err)
						console.error(err);
				});
			}
			else {
				let output = this.prepareOutput();
				
				if (process.env.EXTRA_SPACES > 0) {
					for (let i = 1; i <= process.env.EXTRA_SPACES; i++) {
						output += " ";
					}
				} else if (process.env.EXTRA_SPACES < 0) {
					output = output.substr(0, (output.length + parseInt(process.env.EXTRA_SPACES)));
				}
				
				fs.writeFileSync(process.env.FILE_LOCATION, output, (err) => {
					if (err)
						console.error(err);
				});
				
			}
			this.changed = false;
		}
	}

	prepareOutput() {
		let template = process.env.OUTPUT_FORMAT;
		
		let returnVal = template.replace(/\$artist/, this._artist).replace(/\$track/, this._title).replace(/\$album/, this._album);

		return returnVal;
	}
}

module.exports = MusicTicker;