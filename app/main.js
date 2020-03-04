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
import {} from "piu/MC";
import SCREENS from "screens";
import Preference from "preference";
import { Hand } from "sensors";
import {
	THUMB,
	INDEX,
	OTHER
} from "gestures";

class HandApplicationBehavior extends Behavior {
	onCreate(application, data) {
		this.data = data;
		this.data.changed = { [THUMB]: {}, [INDEX]: {}, [OTHER]: {} };
		let thumbMin = Preference.get("min", THUMB ) || 20;	
		let thumbMax = Preference.get("max", THUMB ) || 160;	
		let indexMin = Preference.get("min", INDEX ) || 20;	
		let indexMax = Preference.get("max", INDEX ) || 160;	
		let otherMin = Preference.get("min", OTHER ) || 20;	
		let otherMax = Preference.get("max", OTHER ) || 160;	
		this.hand = new Hand({
			thumb: {
				pin: 27,
				min: thumbMin,
				max:thumbMax
			},
			index: {
				pin: 32,
				min: indexMin,
				max: indexMax
			},
			other: {
				pin: 33,
				min: otherMin,
				max: otherMax
			}
		});
		this.doSwitchScreen(application, "HOME", data);
	}
	switchScreen(application, nextScreenName) {
		application.defer("doSwitchScreen", nextScreenName);
	}
	doSwitchScreen(application, nextScreenName) {
		application.stop();
		if (application.length) application.remove(application.first);
		application.purge();
		let data = this.data;
		switch (nextScreenName) {
			case "HOME":
				this.hand.stop();
				let keys = [THUMB, INDEX, OTHER];
				for (let key in keys) {
					if (undefined !== data.changed[key]["min"]) Preference.set("min", key , data.changed[key]["min"]);
					if (undefined !== data.changed[key]["max"]) Preference.set("max", key , data.changed[key]["max"]);
				}
				application.add(new SCREENS.HomeScreen(data));
				break;
			case "DEMO":
				application.add(new SCREENS.DemoScreen(data));
				break;
			case "PRESETS":
				application.add(new SCREENS.PresetsScreen(data));
				break;
			case "SETTINGS":
				data.changed = { [THUMB]: {}, [INDEX]: {}, [OTHER]: {} };
				data.min = this.hand.min;
				data.max = this.hand.max;
				application.add(new SCREENS.SettingsScreen(data));
				break;
			case "CONTROL":
				application.add(new SCREENS.ControlScreen(data));
				break;
		}
	}
	moveFinger(application, finger, angle) {
		this.hand.moveFinger(finger, angle);
	}
	doGesture(application, gesture) {
		this.hand.doGesture(gesture);
	}
	setMinimum(application, finger, value) {
		this.hand.moveFinger(finger, value);
		this.hand.setMinimum(finger, value);
		this.data.changed[finger]["min"] = value;
	}
	setMaximum(application, finger, value) {
		this.hand.moveFinger(finger, value);
		this.hand.setMaximum(finger, value);
		this.data.changed[finger]["max"] = value;
	}
}
Object.freeze(HandApplicationBehavior.prototype);

export default function () {
	return new Application({}, { 
		commandListLength: 4096, displayListLength: 4096,
		top: 0, bottom: 0, left: 0, right: 0,
		Behavior: HandApplicationBehavior
	});
}