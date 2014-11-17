(function() {
	var joystick = null;
	JoyStick.getInstance = function(touchArea) {
		if (null == joystick) {
			joystick = new JoyStick(touchArea);
		}
		return joystick;
	}
})();