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
const TRANSPARENT = "transparent";
const WHITE = "#ffffff";
const BLACK = "black";
const RED = "#bc2f1e";
const RED2 = "#e96757";
const YELLOW = "#f8d600";
const YELLOW2 = "#ffe456";
const GREEN = "#95d472";
const GREEN2 = "#8bd463";
const BLUE = "#426dc8";
const SETTINGS_GRAY = "#f1f2eb";
const LIGHTEST_GRAY = "#cacaca";
const GRAY = "#a6a8ab";
const MED_GRAY = "#616161";
const DARK_GRAY = "#979797";

const OpenSans12 = Style.template({ font:"open-sans-reg-12", color: BLACK });

const WhiteSkin = Skin.template({ fill: [WHITE, TRANSPARENT] });
const BlackSkin = Skin.template({ fill: [BLACK, TRANSPARENT] });
const RedSkin = Skin.template({ fill: [RED, TRANSPARENT] });
const YellowSkin = Skin.template({ fill: [YELLOW, TRANSPARENT] });
const GreenSkin = Skin.template({ fill: [GREEN2, TRANSPARENT] });
const BlueSkin = Skin.template({ fill: [BLUE, TRANSPARENT] });
const LightestGraySkin = Skin.template({ fill: [LIGHTEST_GRAY, TRANSPARENT] });
const SettingsGraySkin = Skin.template({ fill: [SETTINGS_GRAY, TRANSPARENT] });
const MediumGraySkin = Skin.template({ fill: [MED_GRAY, TRANSPARENT] });
const DarkGraySkin = Skin.template({ fill: [DARK_GRAY, TRANSPARENT] });

const ControlIconTexture = Texture.template({ path: "control-icon.png" });
const ControlIconSkin = Skin.template({ 
	Texture: ControlIconTexture,
	color: [WHITE, TRANSPARENT],
	width: 80, height: 92,
});

const DemoIconTexture = Texture.template({ path: "demo-icon.png" });
const DemoIconSkin = Skin.template({ 
	Texture: DemoIconTexture,
	color: [WHITE, TRANSPARENT],
	width: 90, height: 90,
});

const PresetsIconTexture = Texture.template({ path: "presets-icon.png" });
const PresetsIconSkin = Skin.template({ 
	Texture: PresetsIconTexture,
	color: [BLACK, TRANSPARENT],
	width: 79, height: 96,
});

const SettingsIconTexture = Texture.template({ path: "settings-icon.png" });
const SettingsIconSkin = Skin.template({ 
	Texture: SettingsIconTexture,
	color: [DARK_GRAY, TRANSPARENT],
	width: 72, height: 59,
});

const DemoHeaderIconTexture = Texture.template({ path: "demo-header-icon.png" });
const DemoHeaderIconSkin = Skin.template({ 
	Texture: DemoHeaderIconTexture,
	color: [WHITE, TRANSPARENT],
	width: 64, height: 30,
});

const ControlHeaderIconTexture = Texture.template({ path: "control-header-icon.png" });
const ControlHeaderIconSkin = Skin.template({ 
	Texture: ControlHeaderIconTexture,
	color: [WHITE, TRANSPARENT],
	width: 85, height: 25,
});

const PresetsHeaderIconTexture = Texture.template({ path: "preset-header-icon.png" });
const PresetsHeaderIconSkin = Skin.template({ 
	Texture: PresetsHeaderIconTexture,
	color: [WHITE, TRANSPARENT],
	width: 40, height: 19,
});

const SettingsHeaderIconTexture = Texture.template({ path: "settings-header-icon.png" });
const SettingsHeaderIconSkin = Skin.template({ 
	Texture: SettingsHeaderIconTexture,
	color: [WHITE, TRANSPARENT],
	width: 36, height: 29,
});

const BackButtonTexture = Texture.template({ path: "back-arrow.png" });
const BackButtonSkin = Skin.template({ 
	Texture: BackButtonTexture,
	color: [WHITE, TRANSPARENT],
	width: 14, height: 24,
});

const PauseButtonTexture = Texture.template({ path: "pause.png" });
const PauseButtonSkin = Skin.template({ 
	Texture: PauseButtonTexture,
	color: [WHITE, TRANSPARENT],
	width: 20, height: 32,
});

const PlayButtonTexture = Texture.template({ path: "play.png" });
const PlayButtonSkin = Skin.template({ 
	Texture: PlayButtonTexture,
	color: [WHITE, TRANSPARENT],
	width: 32, height: 34,
});

const ControlHandTexture = Texture.template({ path: "control-hand.png" });
const ControlHandSkin = Skin.template({ 
	Texture: ControlHandTexture,
	color: [WHITE, TRANSPARENT],
	width: 125, height: 163,
});

const ThumbTexture = Texture.template({ path: "thumb-hl.png" });
const ThumbSkin = Skin.template({ 
	Texture: ThumbTexture,
	color: [RED2, TRANSPARENT],
	width: 38, height: 72,
});

const IndexTexture = Texture.template({ path: "index-hl.png" });
const IndexSkin = Skin.template({ 
	Texture: IndexTexture,
	color: [GREEN, TRANSPARENT],
	width: 29, height: 75,
});

const FingersTexture = Texture.template({ path: "fingers-hl.png" });
const FingersSkin = Skin.template({ 
	Texture: FingersTexture,
	color: [YELLOW2, TRANSPARENT],
	width: 68, height: 94,
});

const RoundedBackgroundTexture = Texture.template({ path: "setting-scrubber-center.png" });
const RoundedBackgroundSkin = Skin.template({ 
	Texture: RoundedBackgroundTexture,
	color: [RED2, YELLOW2, GREEN],
	width: 20, height: 26, tiles: { top: 5, bottom: 5, left: 5, right: 5 }
});


const SettingsSliderTexture = Texture.template({ path: "scrubber.png" });
const SettingsSliderSkin = Skin.template({ 
	Texture: RoundedBackgroundTexture,
	color: MED_GRAY,
	width: 20, height: 26, tiles: { top: 5, bottom: 5, left: 5, right: 5 }
});

const SlowTexture = Texture.template({ path: "slow.png" });
const SlowSkin = Skin.template({ 
	Texture: SlowTexture,
	color: [MED_GRAY, TRANSPARENT],
	width: 30, height: 18
});

const FastTexture = Texture.template({ path: "fast.png" });
const FastSkin = Skin.template({ 
	Texture: FastTexture,
	color: [MED_GRAY, TRANSPARENT],
	width: 28, height: 20
});

/* ================================================================= */
/* ========================= Hand gestures ========================= */
/* ================================================================= */
const GestureColors = ["#ffffff00", WHITE, BLACK, TRANSPARENT];

const PointThumbOutTexture = Texture.template({ path: "point-thumb-out.png" });
const PointThumbOutSkin = Skin.template({ 
	Texture: PointThumbOutTexture,
	color: GestureColors,
	width: 70, height: 120,
});

const PointThumbInTexture = Texture.template({ path: "point-thumb-in.png" });
const PointThumbInSkin = Skin.template({ 
	Texture: PointThumbInTexture,
	color: GestureColors,
	width: 56, height: 120,
});

const FistTexture = Texture.template({ path: "fist.png" });
const FistSkin = Skin.template({ 
	Texture: FistTexture,
	color: GestureColors,
	width: 74, height: 120,
});

const ThumbUpTexture = Texture.template({ path: "thumb-up.png" });
const ThumbUpSkin = Skin.template({ 
	Texture: ThumbUpTexture,
	color: GestureColors,
	width: 120, height: 104,
});

const OpenHandThumbOutTexture = Texture.template({ path: "open-hand-thumb-out.png" });
const OpenHandThumbOutSkin = Skin.template({ 
	Texture: OpenHandThumbOutTexture,
	color: GestureColors,
	width: 70, height: 121,
});

const OpenHandThumbInTexture = Texture.template({ path: "open-hand-thumb-in.png" });
const OpenHandThumbInSkin = Skin.template({ 
	Texture: OpenHandThumbInTexture,
	color: GestureColors,
	width: 60, height: 120,
});

const GraspTexture = Texture.template({ path: "grasp.png" });
const GraspSkin = Skin.template({ 
	Texture: GraspTexture,
	color: GestureColors,
	width: 68, height: 120,
});

const PinchTexture = Texture.template({ path: "pinch.png" });
const PinchSkin = Skin.template({ 
	Texture: PinchTexture,
	color: GestureColors,
	width: 48, height: 120,
});

const MedPointThumbOutTexture = Texture.template({ path: "point-thumb-out-med.png" });
const MedPointThumbOutSkin = Skin.template({ 
	Texture: MedPointThumbOutTexture,
	color: GestureColors,
	width: 48, height: 80,
});

const MedPointThumbInTexture = Texture.template({ path: "point-thumb-in-med.png" });
const MedPointThumbInSkin = Skin.template({ 
	Texture: MedPointThumbInTexture,
	color: GestureColors,
	width: 38, height: 80,
});

const MedFistTexture = Texture.template({ path: "fist-med.png" });
const MedFistSkin = Skin.template({ 
	Texture: MedFistTexture,
	color: GestureColors,
	width: 40, height: 66,
});

const MedThumbUpTexture = Texture.template({ path: "thumb-up-med.png" });
const MedThumbUpSkin = Skin.template({ 
	Texture: MedThumbUpTexture,
	color: GestureColors,
	width: 68, height: 58,
});

const MedOpenHandThumbOutTexture = Texture.template({ path: "open-hand-thumb-out-med.png" });
const MedOpenHandThumbOutSkin = Skin.template({ 
	Texture: MedOpenHandThumbOutTexture,
	color: GestureColors,
	width: 48, height: 80,
});

const MedOpenHandThumbInTexture = Texture.template({ path: "open-hand-thumb-in-med.png" });
const MedOpenHandThumbInSkin = Skin.template({ 
	Texture: MedOpenHandThumbInTexture,
	color: GestureColors,
	width: 40, height: 80,
});

const MedGraspTexture = Texture.template({ path: "grasp-med.png" });
const MedGraspSkin = Skin.template({ 
	Texture: MedGraspTexture,
	color: GestureColors,
	width: 42, height: 74,
});

const MedPinchTexture = Texture.template({ path: "pinch-med.png" });
const MedPinchSkin = Skin.template({ 
	Texture: MedPinchTexture,
	color: GestureColors,
	width: 32, height: 80,
});

const TapTexture = Texture.template({ path: "index-tap-strip.png" });
const TapSkin = Skin.template({ 
	Texture: TapTexture,
	color: GestureColors,
	width: 47, height: 80,
	variants: 47
});

const ThumbsUpTexture = Texture.template({ path: "thumbs-up-strip-02.png" });
const ThumbsUpSkin = Skin.template({ 
	Texture: ThumbsUpTexture,
	color: GestureColors,
	width: 68, height: 57,
	variants: 68,// variants: 57,
});

const DottedLineTexture = Texture.template({ path: "dotted-line.png" });
const DottedLineSkin = Skin.template({ 
	Texture: DottedLineTexture,
	color: [LIGHTEST_GRAY, TRANSPARENT],
	width: 214, height: 3,
});

const SmallHandTexture = Texture.template({ path: "hand-sm.png" });
const SmallHandSkin = Skin.template({ 
	Texture: SmallHandTexture,
	color: [LIGHTEST_GRAY, TRANSPARENT],
	width: 37, height: 47,
});

const SmallThumbTexture = Texture.template({ path: "thumb-sm.png" });
const SmallThumbSkin = Skin.template({ 
	Texture: SmallThumbTexture,
	color: [MED_GRAY, TRANSPARENT],
	width: 11, height: 21,
});

const SmallIndexTexture = Texture.template({ path: "index-sm.png" });
const SmallIndexSkin = Skin.template({ 
	Texture: SmallIndexTexture,
	color: [MED_GRAY, TRANSPARENT],
	width: 8, height: 22,
});

const SmallOtherTexture = Texture.template({ path: "other-fingers-sm.png" });
const SmallOtherSkin = Skin.template({ 
	Texture: SmallOtherTexture,
	color: [MED_GRAY, TRANSPARENT],
	width: 20, height: 27,
});

export default {
	OpenSans12,
	WhiteSkin,
	BlackSkin,
	RedSkin,
	YellowSkin,
	GreenSkin,
	BlueSkin,
	LightestGraySkin,
	SettingsGraySkin,
	MediumGraySkin,
	DarkGraySkin,
	ControlIconSkin,
	DemoIconSkin,
	PresetsIconSkin,
	SettingsIconSkin,
	DemoHeaderIconSkin,
	PresetsHeaderIconSkin,
	SettingsHeaderIconSkin,
	ControlHeaderIconSkin,
	BackButtonSkin,
	PauseButtonSkin,
	PlayButtonSkin,
	ControlHandSkin,
	ThumbSkin,
	IndexSkin,
	FingersSkin,
	RoundedBackgroundSkin,
	SettingsSliderSkin,
	SlowSkin,
	FastSkin,
	DottedLineSkin,
	PointThumbOutSkin,
	PointThumbInSkin,
	FistSkin,
	ThumbUpSkin,
	OpenHandThumbOutSkin,
	OpenHandThumbInSkin,
	GraspSkin,
	PinchSkin,
	MedPointThumbOutSkin,
	MedPointThumbInSkin,
	MedFistSkin,
	MedThumbUpSkin,
	MedOpenHandThumbOutSkin,
	MedOpenHandThumbInSkin,
	MedGraspSkin,
	MedPinchSkin,
	TapSkin,
	ThumbsUpSkin,
	SmallHandSkin,
	SmallThumbSkin,
	SmallIndexSkin,
	SmallOtherSkin,
}

