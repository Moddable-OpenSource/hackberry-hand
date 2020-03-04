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
import ASSETS from "assets";
import Timeline from "piu/Timeline";

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

const GESTURES = [
	ASSETS.PointThumbOutSkin,
	ASSETS.PointThumbInSkin,
	ASSETS.FistSkin,
	ASSETS.ThumbUpSkin,
	ASSETS.OpenHandThumbOutSkin,
	ASSETS.OpenHandThumbInSkin,
	ASSETS.GraspSkin,
	ASSETS.PinchSkin,
]

const MED_GESTURES = [
	ASSETS.MedPointThumbOutSkin,
	ASSETS.MedPointThumbInSkin,
	ASSETS.MedFistSkin,
	ASSETS.MedThumbUpSkin,
	ASSETS.MedOpenHandThumbOutSkin,
	ASSETS.MedOpenHandThumbInSkin,
	ASSETS.MedGraspSkin,
	ASSETS.MedPinchSkin,
]

class BackButtonBehavior extends Behavior {
	onTouchEnded(button) {
		application.delegate("switchScreen", "HOME");
	}
}
Object.freeze(BackButtonBehavior.prototype);

const HeaderBar = Container.template($ => ({
	top: 0, height: 37, left: 0, right: 0, Skin: ASSETS.BlackSkin,
	contents: [
		Container($, {
			left: 0, width: 60, top: 0, height: 50,
			contents: [
				Content($, { 
					top: 7, left: 17, 
					Skin: ASSETS.BackButtonSkin 
				})
			],
			active: true, Behavior: BackButtonBehavior
		}),
		Content($, {
			Skin: $.icon
		}),
	],
}));

/* ================================================================= */
/* ========================== Home screen ========================== */
/* ================================================================= */

class ButtonBehavior extends Behavior {
	onCreate(button, nextScreen) {
		this.nextScreen = nextScreen;
	}
	onTouchEnded(button) {
		application.delegate("switchScreen", this.nextScreen);
	}
}
Object.freeze(ButtonBehavior.prototype);

const HomeScreen = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0, Skin: ASSETS.BlackSkin,
	contents: [
		Container("DEMO", {
			top: 37, left: 0, height: 120, width: 117, 
			Skin: ASSETS.RedSkin,
			contents: [
				Content($, {
					Skin: ASSETS.DemoIconSkin
				})
			],
			active: true, Behavior: ButtonBehavior
		}),
		Container("PRESETS", {
			top: 37, right: 0, height: 120, width: 117, 
			Skin: ASSETS.YellowSkin,
			contents: [
				Content($, {
					Skin: ASSETS.PresetsIconSkin
				})
			],
			active: true, Behavior: ButtonBehavior
		}),
		Container("SETTINGS", {
			bottom: 37, left: 0, height: 120, width: 117, 
			Skin: ASSETS.SettingsGraySkin,
			contents: [
				Content($, {
					Skin: ASSETS.SettingsIconSkin
				})
			],
			active: true, Behavior: ButtonBehavior
		}),
		Container("CONTROL", {
			bottom: 37, right: 0, height: 120, width: 117, 
			Skin: ASSETS.BlueSkin,
			contents: [
				Content($, {
					Skin: ASSETS.ControlIconSkin
				})
			],
			active: true, Behavior: ButtonBehavior
		}),
	]
}));

/* ================================================================= */
/* ========================== Demo screen ========================== */
/* ================================================================= */
class DemoScreenBehavior extends Behavior {
	onCreate(container, data) {
		this.data = data;
		this.gesture = POINT_THUMB_OUT;
		application.delegate("doGesture", this.gesture);
	}
	start(container) {
		this.gesture++;
		if (this.gesture == GESTURES.length) this.gesture = POINT_THUMB_OUT;
		application.delegate("doGesture", this.gesture);
		this.data["GESTURE"].skin = new GESTURES[this.gesture];
		container.time = 0;
		container.duration = 1500;
		container.start();
	}
	onTimeChanged(container) {
		if (container.fraction <= 0.25) {
			container.first.next.state = container.fraction/0.25;
		} else if (container.fraction >= 0.75) {
			container.first.next.state = 1-((container.fraction-0.75)/0.25);
		}
	}
	onFinished(container) {
		this.start(container);
	}
	pause(container) {
		container.stop();
	}
}
Object.freeze(DemoScreenBehavior.prototype);

class PauseButtonBehavior extends Behavior {
	onTouchBegan(button) {
		button.state = 0.5;
	}
	onTouchEnded(button) {
		button.state = 0;
		button.container.delegate("pause");
	}
}
Object.freeze(PauseButtonBehavior.prototype);

class PlayButtonBehavior extends Behavior {
	onTouchBegan(button) {
		button.state = 0.5;
	}
	onTouchEnded(button) {
		button.state = 0;
		button.container.delegate("start");
	}
}
Object.freeze(PlayButtonBehavior.prototype);

const DemoScreen = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0, Skin: ASSETS.RedSkin,
	contents: [
		new HeaderBar({ icon: ASSETS.DemoHeaderIconSkin }),
		Content($, {
			anchor: "GESTURE", Skin: GESTURES[0], state: 1
		}),
		Content($, {
			left: 78, bottom: 19, Skin: ASSETS.PauseButtonSkin,
			active: true, Behavior: PauseButtonBehavior
		}),
		Content($, {
			right: 70, bottom: 19, Skin: ASSETS.PlayButtonSkin,
			active: true, Behavior: PlayButtonBehavior
		})
	],
	Behavior: DemoScreenBehavior
}));

/* ================================================================= */
/* ======================== Presets screen ========================= */
/* ================================================================= */

class GestureButtonBehavior extends Behavior {
	onCreate(button, gesture) {
		this.gesture = gesture;
	}
	onTouchBegan(button) {
		button.state = 2.5;
	}
	onTouchEnded(button) {
		button.state = 2;
		application.delegate("doGesture", this.gesture);
	}
}
Object.freeze(GestureButtonBehavior.prototype);

const GestureButton = Content.template($ => ({
	state: 2, active: true, 
	Behavior: GestureButtonBehavior
}));

class VerticalScrollerBehavior extends Behavior {
	onTouchBegan(scroller, id, x, y) {
		this.anchor = scroller.scroll.y;
		this.y = y;
		this.waiting = true;
	}
	onTouchMoved(scroller, id, x, y, ticks) {
		let delta = y - this.y;
		if (this.waiting) {
			if (Math.abs(delta) < 8)
				return;
			this.waiting = false;
			scroller.captureTouch(id, x, y, ticks);
		}
		scroller.scrollTo(0, this.anchor - delta);
	}
}
Object.freeze(VerticalScrollerBehavior.prototype);

class PresetsScreenBehavior extends VerticalScrollerBehavior {
	onCreate(container, data) {
		this.data = data;
	}
}
Object.freeze(PresetsScreenBehavior.prototype);

class AnimatedGestureButtonBehavior extends GestureButtonBehavior {
	onDisplaying(button) {
		this.index = 0;
		this.delta = 1;
		button.interval = 60;
		button.start();
	}
	onTimeChanged(button) {
		this.index += this.delta;
		if (this.index === 5) {
			this.index = 4;
			this.delta = -1;
		}
		else if (this.index === -1) {
			this.index = 0;
			this.delta = 1;
		}
		button.variant = this.index;
	}
}
const AnimatedGestureButton = Content.template($ => ({
	state: 2, active: true, Behavior: AnimatedGestureButtonBehavior
}));

const PresetsScreen = Scroller.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0,
	contents: [
		Container($, {
			top: 37, left: 0, right: 0, Skin: ASSETS.YellowSkin,
			contents: [
				new AnimatedGestureButton(ANIMATED_THUMBS_UP, { left: 31, top: 22, Skin: ASSETS.ThumbsUpSkin }),
				new AnimatedGestureButton(ANIMATED_TAP, { left: 150, top: 14, Skin: ASSETS.TapSkin }),
				Content($, { top: 114, height: 1, width: 240, Skin: ASSETS.DarkGraySkin }),
				new GestureButton(POINT_THUMB_OUT, { Skin: MED_GESTURES[POINT_THUMB_OUT], left: 30, top: 133 }),
				new GestureButton(POINT_THUMB_IN, { Skin: MED_GESTURES[POINT_THUMB_IN], left: 155, top: 139 }),
				new GestureButton(FIST, { Skin: MED_GESTURES[FIST], left: 47, top: 259 }),
				new GestureButton(THUMB_UP, { Skin: MED_GESTURES[THUMB_UP], left: 141, top: 267 }),
				new GestureButton(OPEN_HAND_THUMB_OUT, { Skin: MED_GESTURES[OPEN_HAND_THUMB_OUT], left: 42, top: 365 }),
				new GestureButton(OPEN_HAND_THUMB_IN, { Skin: MED_GESTURES[OPEN_HAND_THUMB_IN], left: 144, top: 367 }),
				new GestureButton(GRASP, { Skin: MED_GESTURES[GRASP], left: 38, top: 487 }),
				new GestureButton(PINCH, { Skin: MED_GESTURES[PINCH], left: 150, top: 483 }),
				Content($,{ top: 583, height: 60 })
			]
		}),
		new HeaderBar({ icon: ASSETS.PresetsHeaderIconSkin }),
	],
	active: true, Behavior: PresetsScreenBehavior,
}));

/* ================================================================= */
/* ======================== Settings screen ======================== */
/* ================================================================= */
class MinMaxSliderBehavior extends Behavior {
	onCreate(slider, data) {
		this.data = data;
	}
	onUpdate(slider, from, val) {
		let data = this.data;
		let greenBar = data["GREEN_BAR"];
		greenBar.position = { x: greenBar.next.x, y: greenBar.position.y };
		greenBar.width = greenBar.next.next.x - greenBar.next.x;
		if (0 === from) {
			application.delegate("setMinimum", data.finger, val);
		} else if (1 === from) {
			application.delegate("setMaximum", data.finger, val);
		}
	}
}
Object.freeze(MinMaxSliderBehavior.prototype);

class MinMaxPickerBehavior extends Behavior {
	onCreate(picker, data) {
		this.data = data;
	}
	onTouchBegan(picker, id, x, y, ticks) {
		let data = this.data;
		let min = (0 === data.pos)? picker.container.x : picker.previous.x+picker.previous.width;
		let max = (0 === data.pos)? picker.next.x-picker.width : picker.container.x+picker.container.width-picker.width;
		x -= 10;
		if (x < min) x = min;
		else if (x > max) x = max;
		picker.position = { x:x, y: picker.position.y };

		min = picker.container.x;
		max = picker.container.x+picker.container.width-picker.width;
		let fraction = (x-min)/(max-min);
		let val = Math.round(fraction * 180);
		picker.first.string = val;
		picker.container.delegate("onUpdate", data.pos, val);
	}
	onTouchMoved(picker, id, x, y, ticks) {
		let data = this.data;
		let min = (0 === data.pos)? picker.container.x : picker.previous.x+20;
		let max = (0 === data.pos)? picker.next.x-20 : picker.container.x+picker.container.width-20;
		x -= 10;
		if (x < min) x = min;
		else if (x > max) x = max;
		picker.position = { x:x, y: picker.position.y };

		min = picker.container.x;
		max = picker.container.x+picker.container.width-20;
		let fraction = (x-min)/(max-min);
		let val = Math.round(fraction * 180);
		picker.first.string = val;
		picker.container.delegate("onUpdate", data.pos, val);
	}
}
Object.freeze(MinMaxPickerBehavior.prototype);

const MinMaxPicker = Container.template($ => ({
	width: 22, height: 43, clip: false,
	contents: [
		Label($, {
			width: 22, top: 0, Style: ASSETS.OpenSans12, string: (0 === $.pos)? $.min : $.max,
		}),
		Content($, {
			top: 17, left: 0, width: 20, height: 25, Skin: ASSETS.SettingsSliderSkin, state: 0
		})
	],
	active: true, Behavior: MinMaxPickerBehavior
}));

const MinMaxSlider = Container.template($ => {
	let minLeft = ($.min/180)*140;
	let maxLeft = ($.max/180)*140;
	return {
	width: 160,
	contents: [
		Content($, { 
			top: 26, left: 0, right: 0, height: 6, 
			Skin: ASSETS.MediumGraySkin 
		}),
		Content($, { 
			anchor: "GREEN_BAR", 
			top: 27, left: minLeft, width: maxLeft - minLeft+2, height: 4, 
			Skin: ASSETS.GreenSkin 
		}),
		new MinMaxPicker({ pos: 0, min: $.min, max: $.max }, { top: 0, left: minLeft }),
		new MinMaxPicker({ pos: 1, min: $.min, max: $.max }, { top: 0, left: maxLeft }),
	],
	Behavior: MinMaxSliderBehavior
}});

class SliderBehavior extends Behavior {
	onCreate(slider, data) {
		this.data = data;
	}
	onTouchBegan(slider, id, x, y, ticks) {
		this.move(slider, id, x, y);
	}
	onTouchMoved(slider, id, x, y, ticks) {
		this.move(slider, id, x, y);
	}
	move(slider, id, x, y) {
		let min = slider.x + 9;
		let max = slider.x + slider.width - 9;
		if (x < min) x = min;
		else if (x > max) x = max;
		slider.last.position = { x:x-9, y: slider.last.position.y };
		this.data["GREEN_BAR"].width = x - 9 -slider.x;
		let fraction = (x-min)/(max-min);
		let val = fraction * 180;
		application.delegate("moveFinger", this.finger, val);		
	}
}
Object.freeze(SliderBehavior.prototype);

const Slider = Container.template($ => ({
	width: 126,
	contents: [
		Content($, { 
			left: 0, right: 0, height: 6, 
			Skin: ASSETS.MediumGraySkin 
		}),
		Content($, { 
			anchor: "GREEN_BAR", 
			left: 1, width:0, height: 4, 
			Skin: ASSETS.GreenSkin }),
		Content($, {
			left: 0, width: 20, height: 25, 
			Skin: ASSETS.SettingsSliderSkin, state: 0
		})
	],
	active: true, Behavior: SliderBehavior
}));

const SettingsScreen = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0, Skin: ASSETS.SettingsGraySkin,
	contents: [
		new HeaderBar({ icon: ASSETS.SettingsHeaderIconSkin }),

		Content($, { left: 11, top: 48, Skin: ASSETS.SmallHandSkin }),
		Content($, { left: 11, top: 66, Skin: ASSETS.SmallThumbSkin }),
		new MinMaxSlider({ finger: THUMB, min: $.min[THUMB], max: $.max[THUMB] }, { top: 45, left: 68 }),

		Content($, { left: 11, top: 118, Skin: ASSETS.SmallHandSkin }),
		Content($, { left: 21, top: 120, Skin: ASSETS.SmallIndexSkin }),
		new MinMaxSlider({ finger: INDEX, min: $.min[INDEX], max: $.max[INDEX]  }, { top: 117, left: 68 }),

		Content($, { left: 11, top: 187, Skin: ASSETS.SmallHandSkin }),
		Content($, { left: 28, top: 187, Skin: ASSETS.SmallOtherSkin }),
		new MinMaxSlider({ finger: OTHER, min: $.min[OTHER], max: $.max[OTHER]  }, { top: 187, left: 68 }),

		Content($, { left: 14, top: 108, height: 2, width: 212, Skin: ASSETS.DottedLineSkin }),
		Content($, { left: 14, top: 178, height: 2, width: 212, Skin: ASSETS.DottedLineSkin }),
		Content($, { left: 14, top: 248, height: 2, width: 212, Skin: ASSETS.LightestGraySkin }),
	]
}));

/* ================================================================= */
/* ======================== Control screen ========================= */
/* ================================================================= */
class VerticalSliderBehavior extends Behavior {
	onCreate(slider, data) {
		this.finger = data.finger;
	}
	onTouchBegan(slider, id, x, y, ticks) {
		this.move(slider, id, x, y);
	}
	onTouchMoved(slider, id, x, y, ticks) {
		this.move(slider, id, x, y);
	}
	move(slider, id, x, y) {
		let min = slider.y + 9;
		let max = slider.y + slider.height - 9;
		if (y < min) y = min;
		else if (y > max) y = max;
		slider.last.position = { x:slider.last.position.x, y };
		let fraction = (y-min)/(max-min);
		let val = 180 - (fraction * 180);
		application.delegate("moveFinger", this.finger, val);
	}
}
Object.freeze(VerticalSliderBehavior.prototype);

const VerticalSlider = Container.template($ => ({
	height: 179,
	contents: [
		Content($, {
			width: 6, height: 160, 
			Skin: ASSETS.LightestGraySkin,
		}),
		Content($, {
			top: 0, left: 0, width: 36, height: 19, 
			Skin: ASSETS.RoundedBackgroundSkin, state: $.state
		}),
	],
	active: true, Behavior: VerticalSliderBehavior
}));

class HorizontalSliderBehavior extends Behavior {
	onCreate(slider, data) {
		this.finger = data.finger;
	}
	onTouchBegan(slider, id, x, y, ticks) {
		this.move(slider, id, x, y);
	}
	onTouchMoved(slider, id, x, y, ticks) {
		this.move(slider, id, x, y);
	}
	move(slider, id, x, y) {
		let min = slider.x + 9;
		let max = slider.x + slider.width - 9;
		if (x < min) x = min;
		else if (x > max) x = max;
		slider.last.position = { x:x-9, y: slider.last.position.y };
		let fraction = (x-min)/(max-min);
		let val = fraction * 180;
		application.delegate("moveFinger", this.finger, val);
	}
}
Object.freeze(HorizontalSliderBehavior.prototype);

const HorizontalSlider = Container.template($ => ({
	width: 179,
	contents: [
		Content($, {
			width: 160, height: 6, 
			Skin: ASSETS.LightestGraySkin
		}),
		Content($, {
			left: 20, width: 19, height: 36, 
			Skin: ASSETS.RoundedBackgroundSkin, state: $.state
		}),
	],
	active: true, Behavior: HorizontalSliderBehavior
}));

const ControlScreen = Container.template($ => ({
	top: 0, bottom: 0, left: 0, right: 0, Skin: ASSETS.BlueSkin,
	contents: [
		new HeaderBar({ icon: ASSETS.ControlHeaderIconSkin }),
		new VerticalSlider({ finger: OTHER, state: 1 }, { right: 12, top: 52 }),
		new VerticalSlider({ finger: INDEX, state: 2 }, { left: 12, top: 52 }),
		new HorizontalSlider({ finger: THUMB, state: 0 }, { left: 42, bottom: 20, }),
		Container($, {
			left: 50, top: 89, 
			Skin: ASSETS.ControlHandSkin,
			contents: [
				Content($, {
					top: 64, left: 0, 
					Skin: ASSETS.ThumbSkin
				}),
				Content($, {
					top: 10, left: 32, 
					Skin: ASSETS.IndexSkin
				}),
				Content($, {
					top: 0, left: 58, 
					Skin: ASSETS.FingersSkin
				}),				
			]
		}),
	]
}));

export default {
	HomeScreen,
	DemoScreen,
	PresetsScreen,
	SettingsScreen,
	ControlScreen,
}