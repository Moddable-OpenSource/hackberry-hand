/*
 * Copyright (c) 2020 Moddable Tech, Inc.
 *
 *   This file is part of the Moddable SDK.
 * 
 *   This work is licensed under the
 *       Creative Commons Attribution 4.0 International License.
 *   To view a copy of this license, visit
 *       <http://creativecommons.org/licenses/by/4.0>
 *   or send a letter to Creative Commons, PO Box 1866,
 *   Mountain View, CA 94042, USA.
 *
 */
import Servo from "pins/servo";
import Timer from "timer";
import {
	THUMB,
	INDEX,
	OTHER,
	POINT_THUMB_OUT,
	POINT_THUMB_IN,
	FIST,
	THUMB_UP,
	OPEN_HAND_THUMB_OUT,
	OPEN_HAND_THUMB_IN,
	GRASP,
	PINCH,
	ANIMATED_TAP,
	ANIMATED_THUMBS_UP
} from "gestures";

export class Hand {
	constructor(data) {
		this.thumb = new Servo({pin: data.thumb.pin});
		this.index = new Servo({pin: data.index.pin});
		this.other = new Servo({pin: data.other.pin});
		this.min = [data.thumb.min, data.index.min, data.other.min];
		this.max = [data.thumb.max, data.index.max, data.other.max];
	}
	setMinimum(finger, value) {
		this.min[finger] = value;
	}
	setMaximum(finger, value) {
		this.max[finger] = value;
	}
	moveFinger(finger, angle) {
		switch (finger) {
			case THUMB:
				if (angle < this.min[THUMB]) angle = this.min[THUMB];
				else if (angle > this.max[THUMB]) angle = this.max[THUMB];
				this.thumb.write(angle);
				break;
			case INDEX:
				if (angle < this.min[INDEX]) angle = this.min[INDEX];
				else if (angle > this.max[INDEX]) angle = this.max[INDEX];
				this.index.write(angle);
				break;
			case OTHER:
				if (angle < this.min[OTHER]) angle = this.min[OTHER];
				else if (angle > this.max[OTHER]) angle = this.max[OTHER];
				this.other.write(angle);
				break;
		}
	}
	doGesture(gesture) {
		this.stop();
		let thumb, index, other;
		switch (gesture) {
			case POINT_THUMB_OUT:
				thumb = this.max[THUMB];
				index = this.max[INDEX];
				other = this.min[OTHER];
				break;
			case POINT_THUMB_IN:
				thumb = this.min[THUMB];
				index = this.max[INDEX];
				other = this.min[OTHER];
				break;
			case FIST:
				thumb = this.min[THUMB];
				index = this.min[INDEX];
				other = this.min[OTHER];
				break;
			case THUMB_UP:
				thumb = this.max[THUMB];
				index = this.min[INDEX];
				other = this.min[OTHER];
				break;
			case OPEN_HAND_THUMB_OUT:
				thumb = this.max[THUMB];
				index = this.max[INDEX];
				other = this.max[OTHER];
				break;
			case OPEN_HAND_THUMB_IN:
				thumb = this.min[THUMB];
				index = this.max[INDEX];
				other = this.max[OTHER];
				break;
			case GRASP:
				thumb = this.min[THUMB]+20;
				index = this.min[INDEX]+20;
				other = this.min[OTHER]+20;
				break;
			case PINCH:
				thumb = this.min[THUMB];
				index = this.min[INDEX];
				other = this.max[OTHER];
				break;
			case ANIMATED_TAP:
				let max = this.max[INDEX];
				let min = (max - this.min[INDEX])/2;
				this.thumb.write(this.min[THUMB]);
				this.other.write(this.min[OTHER]);
				let val = min;
				let inc = 2;
				this.timer = Timer.repeat(() => {
					this.index.write(val);
					val += inc;
					if (val >= max) {
						inc = -2;
					}
					else if (val <= min) {
						inc = 2;
					}
				}, 10);
				return;
			case ANIMATED_THUMBS_UP:
				let max2 = this.max[THUMB];
				let min2 = this.min[THUMB];
				this.index.write(this.min[INDEX]);
				this.other.write(this.min[OTHER]);
				let val2 = min2;
				let inc2 = 2;
				this.timer = Timer.repeat(() => {
					this.thumb.write(val2);
					val2 += inc2;
					if (val2 >= max2) {
						inc2 = -2;
					}
					else if (val2 <= min2) {
						inc2 = 2;
					}
				}, 10);
				return;
		}
		this.thumb.write(thumb);
		this.index.write(index);
		this.other.write(other);
	}
	stop() {
		if (this.timer) {
			Timer.clear(this.timer);
			delete this.timer;
		}
	}
}
