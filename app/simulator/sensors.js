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
 export class Hand {
	constructor(data) {
		this.min = [data.thumb.min, data.index.min, data.other.min];
		this.max = [data.thumb.max, data.index.max, data.other.max];
	}
	setMinimum(finger, value) {
		this.min[finger] = value;
	}
	setMaximum(finger, value) {
		this.max[finger] = value;
	}
	moveFinger(finger, angle) {}
	doGesture(gesture) {}
	stop() {}
}
